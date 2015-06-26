var GC;

GC = (function() {

    function GC(target) {
        var dayList;
        if (target) {
            this.createSection(target);
            dayList = this.getPerDay(target);
            this.createBar(dayList);
        }
    }


    /**
     *  [createSection create ui base for GC]
     */
    GC.prototype.createSection = function(target) {

        var str_btntoggle = "<div class='btn-toggle'>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-normal' data-target='normal' aria-label='Normal chart view'><i></i></a>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-bar' data-target='bar' aria-label='GC Bar chart view'><i></i></a>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-pie' data-target='pie' aria-label='GC Pie chart view'><i></i></a>"
                + "</div>";

        $(target).siblings('h3').before($(str_btntoggle));

        var str_wrpbar = "<div class='gc-wrapper wrp-bar'>"
                + "<svg width='728' height='600' class='js-calendar-d-svg'></svg>"
                + "</div>";
        $(target).prepend($(str_wrpbar));

        var str_wrppie = "<div class='gc-wrapper wrp-pie'>"
                + "<svg width='728' height='470' class='js-calendar-m-svg'></svg>"
                + "</div>";
        $(target).prepend($(str_wrppie));

        $(target).find('.js-calendar-graph, .contrib-footer').addClass('wrp-normal');

        // get storage
        chrome.storage.local.get('gcToggleSetting', function(result) {
            if (!result.gcToggleSetting) {
                result.gcToggleSetting = 'normal';
            }
            $('.btn-' + result.gcToggleSetting).addClass('active');
            tarChoosen(result.gcToggleSetting);
        });

        // toggle btn & set storage
        $('.btn-toggle').on('click', '.btn-toggle-btn', function(e) {
            e.preventDefault();
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var tar = $(this).data('target');
            tarChoosen(tar);
            chrome.storage.local.set({
                gcToggleSetting: tar
            });
        });

        // deside tar
        function tarChoosen(tar) {
             switch (tar) {
                case 'normal':
                    $('.wrp-normal').removeClass('hidden');
                    $('.wrp-bar').addClass('hidden');
                    $('.wrp-pie').addClass('hidden');
                    break;
                case 'bar':
                    $('.wrp-bar').removeClass('hidden');
                    $('.wrp-normal').addClass('hidden');
                    $('.wrp-pie').addClass('hidden');
                    break;
                case 'pie':
                    $('.wrp-pie').removeClass('hidden');
                    $('.wrp-bar').addClass('hidden');
                    $('.wrp-normal').addClass('hidden');
                    break;  
            }       
        }
    }


    /**
     *  [getPerDat prepare data for GC]
     */
    GC.prototype.getPerDay = function(target) {
        var $year = $(target).find('rect.day'),
            $day,
            dataList = [];

        for (var i = 0, len = $year.length; i < len; i ++) {
            $day = $($year[i]);
            dataList.push({
                date: $day.data('date'),
                count: $day.data('count'),
                fill: $day.attr('fill')
            });
        }
        return dataList;
    }


    /**
     *  [createBar]
     */
    GC.prototype.createBar = function(data) {
        var firstDay = new Date(data[0].date),
            weekDay = firstDay.getDay(),
            firstBar = {
                lx: 125 - 11 * weekDay,
                ly: 100 + 6 * weekDay,
                lh: 0
            },
            arr = [],
            line = [],
            positions = [];

       var colors = [{
            'top': '#eee',
            'left': '#c6c6c6',
            'right': '#dbdbdb'
        }, {
            'top': '#d6e685',
            'left': '#adbd5d',
            'right': '#c1d171'
        }, {
            'top': '#8cc665',
            'left': '#639c3d',
            'right': '#77b051'
        }, {
            'top': '#44a340',
            'left': '#1b7a15',
            'right': '#2f8e29'
        }, {
            'top': '#1e6823',
            'left': '#003f00',
            'right': '#08530d'
        }]; 

       line.push('<polygon points="0,600 ');

        for (var i = 0, len = data.length; i < len; i ++) {
            if (weekDay === 0) {
                firstBar.lx += 7 * 11;
                firstBar.ly -= 5 * 6;
            } else {
                firstBar.lx -= 11;
                firstBar.ly += 6;
            }
            firstBar.lh = data[i].count * 7;
            firstBar.lh = firstBar.lh === 0 ? 2 : firstBar.lh;

            firstBar.class = parseInt((data[i].count + 2)/3);
            firstBar.class = firstBar.class > 4 ? 4 : firstBar.class;

            positions.push({
                lx: firstBar.lx,
                ly: firstBar.ly,
                lh: firstBar.lh
            });
            arr.push('<g>',
                        '<polygon points="', (firstBar.lx-10), ',', (firstBar.ly+5), ' ', (firstBar.lx), ',', (firstBar.ly+10), ' ', (firstBar.lx), ',', (firstBar.ly+10-firstBar.lh), ' ', (firstBar.lx-10), ',', (firstBar.ly+5-firstBar.lh), '" style="fill:', (colors[firstBar.class].left), ';" />', 
                        '<polygon points="', (firstBar.lx), ',', (firstBar.ly+10), ' ', (firstBar.lx+10), ',', (firstBar.ly+5), ' ', (firstBar.lx+10), ',', (firstBar.ly+5-firstBar.lh), ' ', (firstBar.lx), ',', (firstBar.ly+10-firstBar.lh), '" style="fill:', (colors[firstBar.class].right), ';" />',
                        '<polygon points="', (firstBar.lx-10), ',', (firstBar.ly+5-firstBar.lh), ' ', (firstBar.lx), ',', (firstBar.ly+10-firstBar.lh), ' ', (firstBar.lx+10), ',', (firstBar.ly+5-firstBar.lh), ' ', (firstBar.lx), ',', (firstBar.ly-firstBar.lh), '" style="fill:', (colors[firstBar.class].top), ';" />',
                    '</g>');
            line.push(' ', i*2, ',', (600-firstBar.lh));

            weekDay = (weekDay + 1) % 7;
        }
        line.push(' ', (i-1)*2, ',', (600), '" style="fill:#1e6823;"/>');
        arr = arr.concat(line);
        $('.js-calendar-d-svg').html(arr.join(''));
    }

    return GC;
})();

$(function() {
    var gc, target;
    target = document.querySelector('#contributions-calendar');
    return gc = new GC(target);
})


var GC;

GC = (function() {

    function GC(target) {
        if (target) {
            var tar = this.createSection(target);
            this.dataBase = this.getPerDay(target);
            switch (tar) {
                case 'bar':
                this.createBar();
                break;
                case 'pie':
                this.createPie();
            }
        }
    }


    /**
     *  [createSection create ui base for GC]
     */
    GC.prototype.createSection = function(target) {
        var tar = '',
            self = this;

        var str_btntoggle = "<div class='btn-toggle'>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-normal' data-target='normal' aria-label='Normal chart view'><i></i></a>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-bar' data-target='bar' aria-label='GC Bar chart view'><i></i></a>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-pie' data-target='pie' aria-label='GC Pie chart view'><i></i></a>"
                + "</div>";

        $(target).siblings('h3').before($(str_btntoggle));

        var str_wrapper = "<div class='gc-wrapper wrp-bar'></div><div class='gc-wrapper wrp-pie'></div>";
        $(target).prepend($(str_wrapper));

        $(target).find('.js-calendar-graph, .contrib-footer, .contrib-column').addClass('wrp-normal');

        // get storage
        chrome.storage.local.get('gcToggleSetting', function(result) {
            var tar = result.gcToggleSetting ? result.gcToggleSetting : 'normal';
            $('.btn-' + tar).addClass('active');
            tarChoosen(tar);
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
                    if ($('.js-calendar-d-svg').length === 0) {
                        self.createBar();
                    }
                    break;
                case 'pie':
                    $('.wrp-pie').removeClass('hidden');
                    $('.wrp-bar').addClass('hidden');
                    $('.wrp-normal').addClass('hidden');
                    if ($('.js-calendar-m-svg').length === 0) {
                        self.createPie();
                    }
                    break;  
            }       
        }

        return tar;
    }


    /**
     *  [getPerDay prepare data for GC]
     */
    GC.prototype.getPerDay = function(target) {
        var $year = $(target).find('rect.day'),
            $day,
            dataList = {
                day: []
            },
            bestDay = {
                count: 0
            },
            bestMonth = {
                count: 0
            },
            date,
            count,
            month = {},
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        for (var i = 0, len = $year.length; i < len; i ++) {
            $day = $($year[i]);
            date = $day.data('date');
            count = $day.data('count');
            m = date.split('-')[1];
            month[m] = month[m] ? month[m] + count : count;
            dataList.day.push({
                date: date,
                count: count
            });
            if (count > bestDay.count) {
                bestDay.date = date;
                bestDay.count = count;
            }
        }

        for (var i in month) {
            if (month[i] > bestMonth.count) {
                bestMonth.count = month[i];
                bestMonth.date = i;
            }
        }

        bestMonth.date = months[parseInt(bestMonth.date)];
        
        var $contribColumns = $('.contrib-column'),
            ciTotal = $($contribColumns[0]).find('span.contrib-number').html(),
            ciDate = $($contribColumns[0]).find('span:last-child').html(),
            longestStreak = $($contribColumns[1]).find('span.contrib-number').html(),
            longestDate = $($contribColumns[1]).find('span:last-child').html(),
            currentStreak = $($contribColumns[2]).find('span.contrib-number').html(),
            currentDate = $($contribColumns[2]).find('span:last-child').html();

        dataList.info = {
            ciTotal: ciTotal.split(' ')[0],
            ciDate: ciDate,
            longestStreak: longestStreak.split(' ')[0],
            longestDate: longestDate,
            currentStreak: currentStreak.split(' ')[0],
            currentDate: currentDate,
            bestDay: bestDay,
            bestMonth: bestMonth
        }

        return dataList;
    }


    /**
     *  [createPie]
     */
    GC.prototype.createPie = function() {
        var data = this.dataBase.day;
        $('.wrp-pie').append($("<svg width='728' height='470' class='js-calendar-m-svg'></svg>"));
    }

    /**
     *  [createBar]
     */
    GC.prototype.createBar = function() {
        var data = this.dataBase.day,
            info = this.dataBase.info,
            firstDay = new Date(data[0].date),
            weekDay = firstDay.getDay(),
            firstBar = {
                lx: 125 - 11 * weekDay,
                ly: 100 + 6 * weekDay,
                lh: 0
            },
            arr = [],
            line = [],
            legend = [];

        $('.wrp-bar').append($("<svg width='728' height='580' class='js-calendar-d-svg'></svg>"));

        line.push('<g class="day2"><polygon points="0,580 ');
        legend.push('<g class="legend">',
                        '<rect class="legend-green" data-color="green" x="10" y="10" width="10" height="10" style="fill:#8cc665"/>',
                        '<rect class="legend-blue" data-color="blue" x="22" y="10" width="10" height="10" style="fill:#3399cc"/>',
                        '<rect class="legend-red" data-color="red" x="34" y="10" width="10" height="10" style="fill:#ff6666"/>',
                    '</g>',
                    '<text x="327" y="65">Contributions in the last year</text>',
                    '<text class="legend-number" x="552" y="75">', info.ciTotal, '</text>',
                    '<text class="legend-muted" x="562" y="61">Total</text>',
                    '<text x="562" y="75">', info.ciDate, '</text>',
                    '<text x="417" y="110">Busiest month</text>',
                    '<text class="legend-number" x="552" y="120">', info.bestMonth.count, '</text>',
                    '<text class="legend-muted" x="562" y="106">Commits</text>',
                    '<text x="562" y="120">', info.bestMonth.date, '</text>',
                    '<text x="430" y="155">Busiest day</text>',
                    '<text class="legend-number" x="552" y="165">', info.bestDay.count, '</text>',
                    '<text class="legend-muted" x="562" y="149">Commits</text>',
                    '<text x="562" y="165">', info.bestDay.date, '</text>',

                    '<text x="20" y="330">Longest streak</text>',
                    '<text class="legend-number" x="142" y="340">', info.longestStreak, '</text>',
                    '<text class="legend-muted" x="152" y="324">Days</text>',
                    '<text x="152" y="340">', info.longestDate, '</text>',
                    '<text x="20" y="375">Current streak</text>',
                    '<text class="legend-number" x="142" y="385">', info.currentStreak, '</text>',
                    '<text class="legend-muted" x="152" y="369">Days</text>',
                    '<text x="152" y="385">', info.currentDate, '</text>'
                    );
        arr = arr.concat(legend);

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
            firstBar.class = firstBar.class > 4 ? 'day4' : 'day' + firstBar.class;

            arr.push('<g class="', firstBar.class, '">',
                        '<polygon points="', (firstBar.lx-10), ',', (firstBar.ly+5), ' ', (firstBar.lx), ',', (firstBar.ly+10), ' ', (firstBar.lx), ',', (firstBar.ly+10-firstBar.lh), ' ', (firstBar.lx-10), ',', (firstBar.ly+5-firstBar.lh), '" />', 
                        '<polygon points="', (firstBar.lx), ',', (firstBar.ly+10), ' ', (firstBar.lx+10), ',', (firstBar.ly+5), ' ', (firstBar.lx+10), ',', (firstBar.ly+5-firstBar.lh), ' ', (firstBar.lx), ',', (firstBar.ly+10-firstBar.lh), '" />',
                        '<polygon points="', (firstBar.lx-10), ',', (firstBar.ly+5-firstBar.lh), ' ', (firstBar.lx), ',', (firstBar.ly+10-firstBar.lh), ' ', (firstBar.lx+10), ',', (firstBar.ly+5-firstBar.lh), ' ', (firstBar.lx), ',', (firstBar.ly-firstBar.lh), '" />',
                    '</g>');
            line.push(' ', i*2, ',', (580-firstBar.lh));

            weekDay = (weekDay + 1) % 7;
        }
        line.push(' ', (i-1)*2, ',', 580, '" /></g>');
        arr = arr.concat(line);
        $('.js-calendar-d-svg').html(arr.join(''));

        // get storage
        chrome.storage.local.get('gcColorSetting', function(result) {
            var color = result.gcColorSetting ? result.gcColorSetting : 'green';
            colorChoosen(color);
        });

        // color btn & set storage
        $('g.legend').on('click', 'rect', function(e) {
            var color = $(this).data('color');
            colorChoosen(color);
            chrome.storage.local.set({
                gcColorSetting: color
            });
        });


        function colorChoosen(color) {
            var $container = $('.wrp-bar');
            switch (color) {
                case 'green':
                    $container.removeClass('gc-blue');
                    $container.removeClass('gc-red');
                    break;
                case 'blue':
                    $container.addClass('gc-blue');
                    $container.removeClass('gc-red');
                    break;
                case 'red':
                    $container.removeClass('gc-blue');
                    $container.addClass('gc-red');
                    break;
            }
        }
    }

    return GC;
})();

$(function() {
    var gc, target;
    target = document.querySelector('#contributions-calendar');
    return gc = new GC(target);
})


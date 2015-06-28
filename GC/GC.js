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
        var data = this.dataBase.day,
            total = this.dataBase.info.ciTotal,
            firstDay = new Date(data[0].date),
            weekDay = firstDay.getDay(),
            weekData = [],
            pieData = [
                {angle: 52},
                {angle: 51},
                {angle: 51},
                {angle: 52},
                {angle: 51},
                {angle: 51},
                {angle: 52}
            ],
            bestWeek = {
                count:0
            },
            colors = [
                '#97b552',
                '#2ec7c9',
                '#5ab1ef',
                '#ffb980',
                '#d87a80',
                '#8d98b3',
                '#e5cf0d'
            ],
            weeks = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thurday',
                'Friday',
                'Saturday'
            ],
            startPoint = {},
            endPoint = {},
            polyline = {},
            totalAngle = 0,
            radius,fill;

        
        for (var i = 0, len = data.length; i < len; i ++) {
            weekData[weekDay] = weekData[weekDay] ? weekData[weekDay] + data[i].count : data[i].count;
            weekDay = (weekDay + 1) % 7;
        }

        for (var i = 0; i < 7; i ++) {
            if (weekData[i] === undefined) {
                weekData[i] = 0;
                continue;
            }
            if (weekData[i] > bestWeek.count) {
                bestWeek.count = weekData[i];
                bestWeek.name = i;
            }
        }


        for (var i = 0; i < 7; i ++) {
            radius = weekData[i]/bestWeek.count*115;
            fill = colors[i];

            startPoint.x = 120 + Math.sin(totalAngle/180*Math.PI) * radius;
            startPoint.y = 120 - Math.cos(totalAngle/180*Math.PI) * radius;
            totalAngle += pieData[i].angle;
            endPoint.x = 120 + Math.sin(totalAngle/180*Math.PI) * radius;
            endPoint.y = 120 - Math.cos(totalAngle/180*Math.PI) * radius;

            polyline.angle = (totalAngle-26)/180*Math.PI;
            polyline.x1 = 120 + Math.sin(polyline.angle) * radius;
            polyline.y1 = 120 - Math.cos(polyline.angle) * radius;
            polyline.x2 = 120 + Math.sin(polyline.angle) * 135;
            polyline.y2 = 120 - Math.cos(polyline.angle) * 140;
            if (polyline.angle > Math.PI) {
                polyline.x3 = polyline.x2 - 20;
                polyline.align = 'end';
            } else {
                polyline.x3 = polyline.x2 + 20;
                polyline.align = 'start';
            }
            polyline.y3 = polyline.y2;


            pieData[i] = {
                start: {
                    x: startPoint.x,
                    y: startPoint.y
                },
                end: {
                    x: endPoint.x,
                    y: endPoint.y
                },
                radius: radius,
                fill: fill,
                pol: {
                    x1: polyline.x1,
                    y1: polyline.y1,
                    x2: polyline.x2,
                    y2: polyline.y2,
                    x3: polyline.x3,
                    y3: polyline.y3,
                    align: polyline.align
                }
            };
        }

        $('.wrp-pie').append($("<svg width='728' height='340' class='js-calendar-m-svg'></svg>"));

        var arr = [];
        arr.push('<g transform="translate(70, 50)">',
                    '<circle cx="120" cy="120" r="120" stroke="#bbb" stroke-width="1" fill="white" />');
        for (var i = 0; i < 7; i ++) {
            arr.push(
                    '<path d="M120 120,L', pieData[i].start.x, ' ', pieData[i].start.y, ' A', pieData[i].radius, ' ', pieData[i].radius, ' 0 0 1 ', pieData[i].end.x, ' ', pieData[i].end.y, ' Z" fill="', pieData[i].fill, '" />',
                    '<polyline points="', pieData[i].pol.x1, ',', pieData[i].pol.y1, ' ', pieData[i].pol.x2, ',', pieData[i].pol.y2, ' ', pieData[i].pol.x3, ',', pieData[i].pol.y3, '" style="fill:transparent;stroke:', pieData[i].fill, ';stroke-width:1"/>',
                    '<text x="', pieData[i].pol.x3, '" y="', pieData[i].pol.y3, '" fill="', pieData[i].fill, '" text-anchor="', pieData[i].pol.align, '">', weeks[i], '</text>'
                );
        }
        arr.push(
                    '<circle cx="120" cy="120" r="15" fill="white" />',
                    '<circle cx="120" cy="120" r="9" stroke="#bbb" stroke-width="1" fill="white" />',
                '</g>'
            );
        if (bestWeek.name !== undefined) {
            arr.push('<text x="360" y="180" class="legend-title">Most busy on ', weeks[bestWeek.name], '.</text>');
        } else {
            arr.push('<text x="370" y="180" class="legend-title">Seems not busy.</text>');
        }

        $('.js-calendar-m-svg').html(arr.join(''));

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
                lx: 92 - 11 * weekDay,
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
                    '<g transform="translate(327, 65)">',
                        '<text>Contributions in the last year</text>',
                        '<text class="legend-number" x="225" y="10">', info.ciTotal, '</text>',
                        '<text class="legend-muted" x="235" y="-4">Total</text>',
                        '<text x="235" y="10">', info.ciDate, '</text>',
                    '</g>',
                    '<g transform="translate(327, 110)">',
                        '<text x="90">Busiest month</text>',
                        '<text class="legend-number" x="225" y="10">', info.bestMonth.count, '</text>',
                        '<text class="legend-muted" x="235" y="-4">Commits</text>',
                        '<text x="235" y="10">', info.bestMonth.date, '</text>',
                    '</g>',
                    '<g transform="translate(327, 155)">',
                        '<text x="100">Busiest day</text>',
                        '<text class="legend-number" x="225" y="10">', info.bestDay.count, '</text>',
                        '<text class="legend-muted" x="235" y="-4">Commits</text>',
                        '<text x="235" y="10">', info.bestDay.date, '</text>',
                    '</g>',
                    '<g transform="translate(-80, 330)">',
                        '<text x="90">Longest streak</text>',
                        '<text class="legend-number" x="225" y="10">', info.longestStreak, '</text>',
                        '<text class="legend-muted" x="235" y="-4">Days</text>',
                        '<text x="235" y="10">', info.longestDate, '</text>',
                    '</g>',
                    '<g transform="translate(-80, 375)">',
                        '<text x="90">Current streak</text>',
                        '<text class="legend-number" x="225" y="10">', info.currentStreak, '</text>',
                        '<text class="legend-muted" x="235" y="-4">Days</text>',
                        '<text x="235" y="10">', info.currentDate, '</text>',
                    '</g>'
                    );
        arr = arr.concat(legend);

        for (var i = 0, len = data.length; i < len; i ++) {
            if (weekDay === 0) {
                firstBar.lx += 7 * 12;
                firstBar.ly -= 5 * 6;
            } else {
                firstBar.lx -= 12;
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


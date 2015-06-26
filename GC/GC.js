var GC;

GC = (function() {

    function GC(container) {
        var dayList;
        if (container) {
            this.createSection(container);
            dayList = this.getPerDay(container);

            console.log(dayList);

        }
    
    }


    /**
     *  [createSection create ui base for GC]
     */
    GC.prototype.createSection = function(container) {
        var $box = $(container);
        var str = "<div class='btn-toggle'>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-normal' data-target='1' aria-label='Normal chart view'><i></i></a>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-bar active' data-target='2' aria-label='GC Bar chart view'><i></i></a>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-pie' data-target='4' aria-label='GC Pie chart view'><i></i></a>"
                + "</div>";

        $box.siblings('h3').before($(str));

        $('.btn-toggle').on('click', '.btn-toggle-btn', function(e) {
            e.preventDefault();
            console.log($(this).data('target'));
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });   
    }


    /**
     *  [getPerDat prepare data for GC]
     */
    GC.prototype.getPerDay = function(container) {
        var $year = $(container).find('rect.day'),
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

    return GC;
})();

$(function() {
    var gc, container;
    container = document.querySelector('#contributions-calendar');
    return gc = new GC(container);
})


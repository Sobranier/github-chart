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
        var str = "<div class='btn-toggle'>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-normal' data-target='noraml' aria-label='Normal chart view'><i></i></a>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-bar' data-target='bar' aria-label='GC Bar chart view'><i></i></a>"
                + "<a href='#' class='tooltipped tooltipped-nw btn-toggle-btn btn-pie' data-target='pie' aria-label='GC Pie chart view'><i></i></a>"
                + "</div>";

        $(container).siblings('h3').before($(str));

        chrome.storage.local.get('gcToggleSetting', function(result) {
            if (!result.gcToggleSetting) {
                result.gcToggleSetting = 'normal';
            }
            $('.btn-' + result.gcToggleSetting).addClass('active');
        });

        var str = "<div class='gc-wrapper .wrp-bar' style='height:100px'></div>";


        $('.btn-toggle').on('click', '.btn-toggle-btn', function(e) {
            e.preventDefault();
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            chrome.storage.local.set({
                gcToggleSetting: $(this).data('target')
            });
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


var GC;

GC = (function() {
    function GC(container) {
        if (container) {
            this.createSection(container);
        }
    
    }

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

    return GC;
})();

$(function() {
    var gc, container;
    container = document.querySelector('#contributions-calendar');
    return gc = new GC(container);
})

/*

$(function(){
    function init() {
        var dataList = getData();
    }

    function getData() {
        var $svg_g = $('#contributions-calendar').find('.js-calendar-graph-svg>g'),
            $svg_g_list = $svg_g.children('g');
        console.log($svg_g_list);
            
        
    }

    init();
});

*/

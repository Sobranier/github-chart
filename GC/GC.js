var GC;

GC = (function() {})()

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

    function createSection() {
        var $box = $("#contributions-calendar");

        var str = "<span class='icon-toggle'>"
                + "<a href='#' class='tooltipped tooltipped-nw icon-toggle-btn btn-1' data-target='1' aria-label='Normal chart view'></a>"
                + "<a href='#' class='tooltipped tooltipped-nw icon-toggle-btn btn-2 active' data-target='2' aria-label='试图2'></a>"
                + "<a href='#' class='tooltipped tooltipped-nw icon-toggle-btn btn-4' data-target='4' aria-label='试图3'></a>"
                + "</span>";

        // !!! 这里不想使用普通试图，想要把str换成svg的，以便在上面进行作图
        // 第一个，四个正方形
        // 第二个，三个四边形
        // 第三个曲线？？？等等的
        $box.siblings('h3').before($(str));

        $('.icon-toggle').on('click', '.icon-toggle-btn', function(e) {
            e.preventDefault();
            console.log($(this).data('target'));
        });
   
    
    }


*/

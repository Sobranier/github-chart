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

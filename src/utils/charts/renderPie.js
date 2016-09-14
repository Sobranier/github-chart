import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

let option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series: [
        {
            name:'Work Day',
            type:'pie',
            radius : [30, 110],
            center : ['25%', '50%'],
            roseType : 'area',
            data:[]
        }
    ]
};

export default (originData, Ntarget) => {
    let myChart = echarts.init(Ntarget);
    let weekDay = new Date(originData[0].date).getDay();
    let data = [
        { value: 0, name: 'Sunday' },
        { value: 0, name: 'Monday' },
        { value: 0, name: 'Tuesday' },
        { value: 0, name: 'Wednesday' },
        { value: 0, name: 'Thurday' },
        { value: 0, name: 'Friday' },
        { value: 0, name: 'Saturday' }
    ];

    originData.forEach((item) => {
        data[weekDay ++].value += item.count;
        weekDay %= 7;
    });

    option.series[0].data = data;

    myChart.setOption(option);
}

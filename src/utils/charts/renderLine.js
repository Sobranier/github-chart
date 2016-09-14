import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

let option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    grid: {
        left: 0,
        right: 0
    },
    xAxis: {
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        data: []
    },
    yAxis: {
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show: false
        }
    },
    series: [{
        name: 'contributions',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: []
    }]
};
 
export default (originData, Ntarget) => {
    let myChart = echarts.init(Ntarget);

    originData.forEach(item => {
        option.xAxis.data.push(item.date);
        option.series[0].data.push(item.count);
    });

    myChart.setOption(option);
}

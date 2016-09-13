import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

export default (originData) => {
    let myChart = echarts.init(document.getElementById('wraChart'));
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
            name: 'contributons',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: []
        }]
    };


    originData.forEach(item => {
        option.xAxis.data.push(item.date);
        option.series[0].data.push(item.count);
    });

    myChart.setOption(option);
}

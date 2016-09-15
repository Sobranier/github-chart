import echarts from 'echarts/lib/echarts';
import renderBar from './charts/renderBar.js';
import renderLine from './charts/renderLine.js';
import renderPie from './charts/renderPie.js';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

export default (originData) => {
    renderBar(originData.slice(), document.getElementById('wraBar'));
    renderLine(originData.slice(), document.getElementById('wraLine'));
    renderPie(originData.slice(), document.getElementById('wraPie'));
}

import getOriginData from './utils/getOriginData';
import renderWrapper from './utils/renderWrapper';
import renderChart from './utils/renderChart';
import renderNotice from './utils/renderNotice';

const targetSelector = '.js-calendar-graph-svg'

class createChart {

    constructor(target) {
        this.Ncontainer = target;
        this.originData = [];
        this.Nwrapper = [];

        this.reRender();
    }

    reRender() {
        this.getOriginData();
        this.renderWrapper();
        this.renderChart();
        this.renderNotice();
    }

    renderWrapper() {
        this.Nwrapper = renderWrapper(document.querySelector(targetSelector));
    }

    renderChart() {
        renderChart(this.originData.slice());
    }

    renderNotice() {
        renderNotice(this.Ncontainer, this.originData.slice());
    }

    getOriginData() {
        // 选择带有data-date属性的所有rect元素
        this.originData = getOriginData(Array.from(document.querySelectorAll(`${targetSelector} rect[data-date]`)));
    }
}


let target = document.querySelector(targetSelector);

if (target) {
    new createChart(target);
}

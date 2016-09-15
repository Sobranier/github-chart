import getOriginData from './utils/getOriginData';
import renderNav from './utils/renderNav';
import renderWrapper from './utils/renderWrapper';
import renderChart from './utils/renderChart';
import renderNotice from './utils/renderNotice';

class createChart {

    constructor(target) {
        this.Ncontainer = target;
        this.originData = [];
        this.Nnav = {};
        this.Nwrapper = [];

        // this.renderNav();
        this.reRender();
    }

    reRender() {
        this.getOriginData();
        this.renderWrapper();
        this.renderChart();
        this.renderNotice();
    }

    renderNav() {
        this.Nnav = renderNav();
    }

    renderWrapper() {
        this.Nwrapper = renderWrapper(this.Ncontainer);
    }

    renderChart() {
        renderChart(this.originData.slice());
    }

    renderNotice() {
        renderNotice(this.Ncontainer, this.originData.slice());
    }

    getOriginData() {
        this.originData = getOriginData(Array.from(this.Ncontainer.querySelectorAll('rect.day')));
    }
}


let target = document.querySelector('.js-calendar-graph-svg');

if (target) {
    new createChart(target);
}

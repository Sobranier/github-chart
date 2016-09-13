import getOriginData from './utils/getOriginData';
import renderNav from './utils/renderNav';
import renderWrapper from './utils/renderWrapper';
import renderChart from './utils/renderChart';

class createChart {

    constructor(target) {
        this.Ncontainer = target;
        this.originData = [];
        this.Nnav = {};
        this.Nwrapper = [];

        this.renderNav();
        this.getOriginData();
        this.renderWrapper();
        this.renderChart();
    }

    renderNav() {
        this.Nnav = renderNav(this.Ncontainer);
    }

    renderWrapper() {
        this.Nwrapper = renderWrapper(this.Ncontainer);
    }

    renderChart() {
        renderChart(this.originData.slice());
    }

    getOriginData() {
        this.originData = getOriginData(Array.from(this.Ncontainer.querySelectorAll('rect.day')));
    }
}


let target = document.getElementById('contributions-calendar');

if (target) {
    new createChart(target);
}

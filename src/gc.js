import getOriginData from './utils/getOriginData';
import renderWrapper from './utils/renderWrapper';
import renderChart from './utils/renderChart';
import renderNotice from './utils/renderNotice';
import addEvent from './utils/addEvent';

class createChart {

    constructor(target) {
        this.Ncontainer = target;
        this.originData = [];
        this.Nwrapper = [];

        this.reRender();
        this.addEvent();
    }

    reRender() {
        this.getOriginData();
        this.renderWrapper();
        this.renderChart();
        this.renderNotice();
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

    addEvent() {
       addEvent(document.querySelector('.profile-timeline-year-list'), this::this.reRender);
    }
}


let target = document.querySelector('.js-calendar-graph-svg');

if (target) {
    new createChart(target);
}

import getOriginData from './utils/getOriginData';
import renderWrapper from './utils/renderWrapper';
import renderChart from './utils/renderChart';
import renderNotice from './utils/renderNotice';
import addEvent from './utils/addEvent';

const targetSelector = '.js-calendar-graph-svg'

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
        this.Nwrapper = renderWrapper(document.querySelector(targetSelector));
    }

    renderChart() {
        renderChart(this.originData.slice());
    }

    renderNotice() {
        renderNotice(this.Ncontainer, this.originData.slice());
    }

    getOriginData() {
        this.originData = getOriginData(Array.from(document.querySelectorAll(`${targetSelector} rect.day`)));
    }

    addEvent() {
        const observer = new MutationObserver(events => {
            this.reRender()
        })

        observer.observe(document.querySelector('.js-repo-filter .mt-4'), { childList: true })
    }
}


let target = document.querySelector(targetSelector);

if (target) {
    new createChart(target);
}

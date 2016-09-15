import tpl from '../tpl/notice.js';

export default (container, originData) => {
    let fragment = document.createDocumentFragment();
    let Node = document.createElement('div');
    Node.className = 'gc-notice-container';

    let stack = {
        length: 0,
        startDate: '',
        endDate: ''
    };
    let tmp = {
        length: 0,
        startDate: '',
        endDate: ''
    };

    originData.forEach(item => {
        if (item.count !== 0) {
            if (tmp.length === 0) {
                tmp.startDate = item.date;
            }
            tmp.endDate = item.date;
            tmp.length ++;
        } else {
            if (tmp.length !== 0) {
                if (tmp.length > stack.length) {
                    stack = Object.assign({}, tmp);
                }
                tmp.length = 0;
            }
        }
    })

    // get best Day
    let bestDay = originData[0];
    originData.forEach(item => {
        if (item.count > bestDay.count) {
            bestDay = Object.assign({}, item);
        }
    });

    Node.innerHTML = [tpl({
        comment: 'Longest Steak',
        count: stack.length,
        unit: 'Days',
        date: `${stack.startDate} to ${stack.endDate}`
    }), tpl({
        comment: 'current Sreak',
        count: tmp.length,
        unit: 'Days',
        date: tmp.length > 0 ? `${tmp.startDate} to ${tmp.endDate}` : ''
    }), tpl({
        comment: 'Best Day',
        count: bestDay.count,
        unit: 'commits',
        date: bestDay.date
    })].join('');
    fragment.appendChild(Node);

    container.parentNode.appendChild(fragment);
}

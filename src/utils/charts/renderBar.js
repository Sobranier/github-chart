import tpl from '../../tpl/pol.js';

export default (originData, Ntarget) => {
    let fragment = document.createDocumentFragment();
    let weekDay = new Date(originData[0].date).getDay();
    let firstBar = {
        lx: 88 - 11 * weekDay,
        ly: 100 + 6 * weekDay,
        lh: 0
    };

    if (weekDay === 0) {
        firstBar.lx -= 11 * 8;
        firstBar.ly += 6 * 8;
    }

    let arr = [];
    arr.push('<svg width="721" height="500" class="gc-svg">');
    for (let i = 0, len = originData.length; i < len; i ++) {
        if (weekDay === 0) {
            firstBar.lx += 7 * 12;
            firstBar.ly -= 5 * 6;
        } else {
            firstBar.lx -= 12;
            firstBar.ly += 6;
        }
        firstBar.lh = originData[i].count * 7;
        firstBar.lh = firstBar.lh === 0 ? 2 : firstBar.lh;
        firstBar.class = parseInt((originData[i].count + 2)/3);
        firstBar.class = firstBar.class > 4 ? 'day4' : 'day' + firstBar.class;

        arr.push(tpl(firstBar.class, firstBar.lx, firstBar.ly, firstBar.lh));
        weekDay = (weekDay + 1) % 7;
    }
    arr.push('</svg>');
    Ntarget.innerHTML = arr.join('');
}

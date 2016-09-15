import tpl from '../tpl/nav';

export default () => {
    let fragment = document.createDocumentFragment();
    let Node = document.createElement('div');
    Node.className = 'btn-toggle';
    Node.innerHTML = tpl();
    fragment.appendChild(Node);

    document.querySelector('.js-contribution-graph').insertBefore(fragment, document.querySelector('.js-select-menu'));

    Node.addEventListener('click', (event) => {
        let targetName = event.target.getAttribute('data-target');
        let className = event.target.className;
        if (className.indexOf('active') < 0) {
            event.target.className = className+ ' active';
        } else {
            event.target.className = className.slice(0, -7);
        }
    })

    return Node;
}

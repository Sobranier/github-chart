import tpl from '../tpl/nav';

export default () => {
    let fragment = document.createDocumentFragment();
    let Node = document.createElement('div');
    Node.className = 'btn-toggle';
    Node.innerHTML = tpl();
    fragment.appendChild(Node);

    document.querySelector('.js-contribution-graph').insertBefore(fragment, document.querySelector('.js-select-menu'));

    return Node;
}

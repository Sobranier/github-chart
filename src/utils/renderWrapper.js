import tpl from '../tpl/wrapper';

export default (container) => {
    let fragment = document.createDocumentFragment();
    let Node = document.createElement('div');

    Node.innerHTML = tpl();
    fragment.appendChild(Node);
    container.parentNode.insertBefore(fragment, container);

    return Node;
}

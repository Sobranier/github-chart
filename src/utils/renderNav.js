import tpl from '../tpl/nav';

export default (container) => {
    let fragment = document.createDocumentFragment();
    let Node = document.createElement('div');
    Node.className = 'btn-toggle';
    Node.innerHTML = tpl();
    fragment.appendChild(Node);

    container.parentNode.insertBefore(fragment, container.previousSibling.previousSibling);

    return Node;
}

import navTpl from '../tpl/nav';

export default (container) => {
    let Nnav = document.createElement('div');
    Nnav.className = 'btn-toggle';
    Nnav.innerHTML = navTpl();

    let docFragment = document.createDocumentFragment();
    docFragment.appendChild(Nnav);

    container.parentNode.insertBefore(docFragment, container.previousSibling.previousSibling);

    return Nnav;
}

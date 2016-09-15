export default (obj) => [
    '<div class="gc-notice">',
        '<div>', obj.comment, '</div>',
        '<h2>', obj.count, '</h2>',
        '<div class="gc-notice-sub">',
            '<h3>', obj.unit, '</h3>',
            '<h4>', obj.date, '</h4>',
        '</div>',
    '</div>'
].join('');

export default (className, lx, ly, lh) => [
    '<g class="', className, '">',
        '<polygon points="', lx-10, ',', ly+5, ' ', lx, ',', ly+10, ' ', lx, ',', ly+10-lh, ' ', lx-10, ',', ly+5-lh, '" />',
        '<polygon points="', lx, ',', ly+10, ' ', lx+10, ',', ly+5, ' ', lx+10, ',', ly+5-lh, ' ', lx, ',', ly+10-lh, '" />',
        '<polygon points="', lx-10, ',', ly+5-lh, ' ', lx, ',', ly+10-lh, ' ', lx+10, ',', ly+5-lh, ' ', lx, ',', ly-lh, '" />',
    '</g>'
].join('');

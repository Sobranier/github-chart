export default Node => Node.map(item => ({
    date: item.getAttribute('data-date'),
    count: item.getAttribute('data-count') - 0
}));

const port = process.env.PORT || 9102;

module.exports = {
    port,
    database: {
        persons: 'persons_test',
        trees: 'trees_test',
        decisions: 'decisions_test',
    },
};

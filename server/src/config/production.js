const port = process.env.PORT || 9101;

module.exports = {
    port,
    database: {
        persons: 'persons',
        trees: 'trees',
        decisions: 'decisions',
    },
};

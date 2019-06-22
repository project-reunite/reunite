const port = process.env.PORT || 9100;

module.exports = {
    port,
    database: {
        persons: 'persons',
        trees: 'trees',
        decisions: 'decisions',
    },
};

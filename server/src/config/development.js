const port = process.env.PORT || 9100;

module.exports = {
    port,
    database: {
        persons: 'persons_migrants',
        trees: 'trees_migrants',
        decisions: 'decisions_migrants',
    },
};

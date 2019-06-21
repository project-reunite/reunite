function logError(err) {
    console.log({
        error: {
            name: err.name,
            message: err.message,
            // data: err.data,
        },
    });
}

module.exports = {
    logError,
};

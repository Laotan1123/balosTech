const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    // Send a generic error response
    res.status(500).send({
        message: 'Something went wrong!',
        error: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;
const errorhandler = (stutusCode, message) => {
    const  error = new Error();
    error.statusCode = stutusCode;
    error.message = message;
    return error;
}

module.exports = errorhandler;
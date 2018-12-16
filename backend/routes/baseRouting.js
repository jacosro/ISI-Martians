
const errorObject = {
    ok: false,
    error: null
};

const okObject = {
    ok: true,
    result: null
};

const responseWithQuery = (res) => (error, result) => {
    if (error) {
        errorObject.error = error.message;
        return res.status(500).json(errorObject);
    }

    okObject.result = result;
    return res.json(okObject);
};

module.exports = { errorObject: errorObject, okObject: okObject, responseWithQuery: responseWithQuery };

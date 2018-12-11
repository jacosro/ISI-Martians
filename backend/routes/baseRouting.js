
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
        errorObject.error = error;
        return res.status(400).json(errorObject);
    }

    okObject.result = result;
    return res.json(okObject);
};

module.exports = { errorObject: errorObject, okObject: okObject, responseWithQuery: responseWithQuery };

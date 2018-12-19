
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
        errorObject.error = "Error operando con la entidad: Error en la base de datos";
        return res.status(500).json(errorObject);
    }

    if (!result) {
        errorObject.error = "La entidad con el id seleccionado no existe"
        return res.status(404).json(errorObject);
    }

    okObject.result = result;
    return res.json(okObject);
};

module.exports = { errorObject: errorObject, okObject: okObject, responseWithQuery: responseWithQuery };


import { GeneralError } from './../utils/errors';

export const handleErrors = async (err, req, res, next) => {
    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode();
        // { name: err.name, message: err.message }
    }

    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
    }

    res.set('x-correlation-id', correlationId);
    
    let msg = { 'correlationId': correlationId, 'error': err.message };
    // we don't know any known error if we come into this point     
    return res.status(code).json(msg);
}
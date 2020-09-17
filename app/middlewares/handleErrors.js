
import { GeneralError } from './../utils/errors';

export const handleErrors = async (err, req, res, next) => {
    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode();        
    }
    
    let correlationId = req.headers['x-correlation-id'];
    return res.status(code).json({
        correlationId: correlationId , message: err.message
    });
}
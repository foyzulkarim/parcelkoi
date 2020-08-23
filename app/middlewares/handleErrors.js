
import { GeneralError } from './../utils/errors';

export const handleErrors = async (err, req, res, next) => {
    if (err instanceof GeneralError) {
        const code = err.getCode();
        return res.status(code).json({ name: err.name, message: err.message });
    }

    // we don't know any known error if we come into this point 
    return res.status(500).json({
        name: 'Internal Server Error', message: err.message
    });
}
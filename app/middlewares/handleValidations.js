import { BadRequest } from "../utils/errors";

export const handleValidations = (validate) => {
    return (req, res, next) => {
        const result = validate(req.body);       
        const valid = result.error == null;
        if (valid) {
            return next();
        } else {
            const { details } = result.error;
            const message = details.map(i => i.message).join(',');
            console.log("error\t", message);
            throw new BadRequest(message);
        }
    }
} 
const Joi = require('joi');

const schema = Joi.object().keys(
    {
        username: Joi.string().alphanum().min(3).max(30).required()
    }
);

const validate = (data) => {
    const result = schema.validate(data);
    data.createdAt = new Date();
    result.value = data;
    return result;
}

export default validate;
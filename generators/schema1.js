const joi = require('joi');
const Schema = joi.object().keys(
    {
        username: joi.string().alphanum().min(3).max(30).required()
    }
);

module.exports = Schema;
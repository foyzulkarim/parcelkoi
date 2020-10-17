const joi = require('joi');
const Schema = joi.object().keys({
    id1: joi.number().integer().positive().required(),
    name1: joi.string(),
    email1: joi.string().email().required(),
    created1: joi.date().allow(null),
    active1: joi.boolean().default(true),
});

module.exports = Schema;
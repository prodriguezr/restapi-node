const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(8).max(8).required(),
        email: Joi.string().email().required()
    });
    
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(8).max(8).required(),
        email: Joi.string().email().required()
    });
    
    return schema.validate(data);
}

const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    });
    
    return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
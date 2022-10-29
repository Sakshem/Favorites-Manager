// Validation
// using @hapi/joi library for validation
const Joi = require('@hapi/joi');

// validation used during registration of a user
const registerValidation = (data) => {
    const validationSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return validationSchema.validate(data);
};

// validation used during login
const loginValidation = (data) => {
    const loginSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return loginSchema.validate(data);
};

// validation used for teacher model class
const teacherValidation = (data) => {
    const teacherSchema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(6).max(255).required().email()
    });
    return teacherSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.teacherValidation = teacherValidation;
const Joi = require ('joi')

const userSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
  });
export default userSchema;
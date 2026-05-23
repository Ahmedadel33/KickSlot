const Joi=require("joi")
const register=Joi.object({
  name:Joi.string().required(),
  email:Joi.string().email().required(),
  phone:Joi.string().required().min(11).max(11),
  password:Joi.string().min(6).required(),
})
const login=Joi.object({
  email:Joi.string().email().required(),
password: Joi.string()
  .min(6)
  .required()
  .messages({
    "string.min": "Password must be at least 6 characters long", 
    "any.required": "Password is required",                     
    "string.empty": "Password cannot be empty"                 
  })})


module.exports={register,login}
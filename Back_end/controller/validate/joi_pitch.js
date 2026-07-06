const Joi = require("joi");

const addPitch = Joi.object({
  pitchName: Joi.string().required(),
  pitchPrice: Joi.number().required(),
  pitchLocation: Joi.string().required(),
  pitchDescription: Joi.string().required()
});

module.exports = addPitch ;
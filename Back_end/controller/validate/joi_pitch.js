const joi = require("joi")
const addPitch= joi.object({
  pitchName:joi.string().required(),
  pitchImage:joi.string().required(),
  pitchPrice:joi.number().required(),
  pitchLocation:joi.string().required(),
  pitchDescription:joi.string().required()
})
module.exports={addPitch}

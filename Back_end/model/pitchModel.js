const mongoose = require ("mongoose")
const pitchSchema=new mongoose.Schema({
pitchName:{
    type:String,
    required:true
},
pitchImage:{
      type:String,
      required:true
},
pitchPrice:{
type:Number,
required:true
},
pitchLocation:{
    type:String,
    required:true
},
pitchDescription:{
    type:String,
    required:true
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})
const pitchModel=mongoose.model("pitch",pitchSchema)
module.exports=pitchModel
const mongoose = require('mongoose');
const dataschema = new mongoose.Schema({
    name :{type:String,required:true},
    label:   {type:String,required:true},
   url:{type:String,required:true}
  })
const data = mongoose.model('data', dataschema);
module.exports = data;




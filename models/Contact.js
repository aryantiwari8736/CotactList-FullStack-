const mongoose = require('mongoose');
const {Schema} = mongoose;
const Contact = new Schema({

    name:{
        type:String,
        required : true
    },
    number:{
        type:Number

    }
})
module.exports=mongoose.model('contact',Contact);
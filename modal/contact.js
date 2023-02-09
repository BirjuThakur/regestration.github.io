const mongoose =require('mongoose');
// schema defines for contact

const contactSchema = new mongoose.Schema({
    fname:{
    type:String,
    required:true,
    },
    email:{
    type:String,
    required:true,
    },
    phone:{
    type:Number,
    required:true,
    min:10,
    },
    message:{
    type:String,
    required:true,
    },
    date:{
    type:Date,
    default:Date.now,
    },

});

//collection define 
const Contact = new mongoose.model("Contact", contactSchema);

module.exports =Contact;
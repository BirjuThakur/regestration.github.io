const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require("validator");

//schema define for registration
const registerSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        minLength:[3, "minimun 3 letters required"],
        maxLength:[20, "more than 20 letters not allowed"],
        lowercase:true,
    },
    lname:{
        type:String,
        required:true,
        minLength:[3, "minimun 3 letters required"],
        maxLength:[20, "more than 20 letters not allowed"],
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error ("email is invalid")
           }
        },
        lowercase:true,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:75,
        validate(value){
            if(value < 0) throw "age should not be negative";
        },
    },
    phoneno:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999,
    },
    pass:{
        type:String,
        required:true,
    },
    confirmpass:{
        type:String,
        required:true,
    },
    tokens:[
        {
         token:{
            type:String,
            required:true,
         }
        }
    ],
    date:{
        type:Date,
        default:Date.now,
    },
});
// creating token with help of jwt 
registerSchema.methods.createtoken = async function(){
const token = jwt.sign({_id:this._id.toString()}, "qwerasdftgyhzxcvbnjikmlopqazswedxmjhvftjyhbuhjd");
this.tokens = this.tokens.concat({token:token});
await this.save();
return token;
};
// passward hasing using bcryptjs
registerSchema.pre("save", async function(next){
if(this.isModified("pass")){
this.pass= await bcrypt.hash(this.pass, 10);
this.confirmpass=await bcrypt.hash(this.confirmpass, 10);
};
next();
});
//collection define for registration
const Register = new mongoose.model("Register", registerSchema);

module.exports=Register;

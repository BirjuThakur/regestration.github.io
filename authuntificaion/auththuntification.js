const jwt =require('jsonwebtoken');
const Register=require('../modal/register');
const cookieParser= require('cookie-parser');

const auth =async (req,res,next)=>{
try {
const token = req.cookies.jwt;
const userverify = jwt.verify(token, "qwerasdftgyhzxcvbnjikmlopqazswedxmjhvftjyhbuhjd");
const user = await Register.findOne({_id:userverify._id});
req.token=token;
req.user = user;
next();
} catch (error) {
res.status(404).send(error);   
}
};

module.exports=auth;
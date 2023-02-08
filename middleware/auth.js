const express =require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');

//database connection
require('../db/connection');
const Contact = require('../modal/contact');
const Register =require('../modal/register');

//for data fetcing 
router.use(express.json());
router.use(express.urlencoded({extended:false}));

//post method for contcat
router.post('/contact', async (req,res) =>{
try {
    const contcat = new Contact({
        fname:req.body.fname,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message,
    });
    const savecontact = await contcat.save();
    res.status(201).render('index');
    console.log(savecontact);
} catch (error) {
   res.status(404).send(error);
}
});
//post method for register 
router.post('/register', async(req,res) =>{
try {
const passward = req.body.pass;
const confirmpass= req.body.confirmpass;
if(passward===confirmpass){
    const register = new Register({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        gender:req.body.gender,
        age:req.body.age,
        phoneno:req.body.phoneno,
        pass:passward,
        confirmpass:confirmpass,
    });
    //creating token using jwt 
    const token = await register.createtoken();
    //cookie storing using cookie
    res.cookie("jwt", token,{
       expires:new Date(Date.now()+ 30000) 
    });
    const saveregister = await register.save();
    res.status(201).render('login');
    console.log(saveregister);
};
} catch (error) {
    res.status(404).send(error);
}
});
//post method for login
router.post('/login', async(req,res) =>{
    try {
    const email= req.body.email;
    const pass= req.body.pass;
    const useremail = await Register.findOne({email:email});
    const ismatch = await bcrypt.compare(pass, useremail.pass);
    //creating token using jwt 
    const token = await useremail.createtoken();
    //cookies store using cookie
    res.cookie("jwt", token, {
        expires:new Date(Date.now()+ 30000)
    });
    if(ismatch){
    res.status(201).render('contact');
    console.log(useremail);
    }
    } catch (error) {
    res.status(404).send(error);
    };
});

module.exports=router;
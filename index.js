const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000 ;
const hbs = require('hbs');
const cookieParser= require("cookie-parser");

app.set("view engine", 'hbs');
const partialpath=path.join(__dirname,"./partial");
hbs.registerPartials(partialpath);


app.use("/css", express.static(path.join(__dirname,"./node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"./node_modules/bootstrap/dist/js")));
app.use(express.static(path.join(__dirname,"./public")));
app.use(require('./middleware/auth'));
//cookie parser for authuntification
app.use(cookieParser());
const auth = require('./authuntificaion/auththuntification');

app.get('/', (req,res) =>{
    res.render('index');
});

app.get('/contact', (req,res) =>{
    res.render('contact');
});

app.get('/register', (req,res) =>{
    res.render('register');
});

app.get('/login', (req,res) =>{
    res.render('login');
});

app.get('/shopping', (req,res) =>{
    res.render('shopping');
});

app.get('/logout',auth, async(req,res) =>{
try {
    req.user.tokens = [];
    res.clearCookie("jwt");
    console.log('logout successfully');
    await req.user.save();
    res.render('login');
} catch (error) {
    res.status(404).send(error);
}
});

app.listen(port, ()=>{
    console.log("running on 3000 port");
});

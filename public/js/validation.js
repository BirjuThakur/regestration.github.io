const validation=()=>{
    const firstname = document.getElementById("fname").value;
    const lastname = document.getElementById("lname").value;
    const mailid = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const phonenumber = document.getElementById("phoneno").value;
    const passward = document.getElementById("pass").value;
    const confirmpass = document.getElementById("cpass").value;

    // first name validation
    const messagefirst = document.getElementById("firsterror");
    messagefirst.innerHTML=" ";
    try {
        if(firstname.trim()=="") throw "write your first name";
        if(!isNaN(firstname)) throw "please enter charecter only";
        if((firstname.length < 3 || firstname.length > 20)) throw "please enter firstname in between 3 to 20";
    } catch (error) {
        messagefirst.innerHTML=error;
    }
    finally{
        firstname.innerHTML= " ";
    }
   //last name validation
   const lastmessage = document.getElementById("lasterror");
   lastmessage.innerHTML=" ";
   try {
    if(lastname.trim()=="") throw "write your last name";
    if(!isNaN(lastname)) throw "please enter charecter only";
    if((lastname.length < 3 || lastname.length > 20)) throw "please enter lastname in between 3 to 20";
   } catch (error) {
    lastmessage.innerHTML=error;
   } 
   //email validation 
   const emailerr = document.getElementById("emailerror");
   emailerr.innerHTML = " ";
   try {
    if(mailid.trim()=="") throw "please fill the email";
    if(mailid.indexOf("@") <= 0) throw "fill proper email";
    if(mailid.charAt(mailid.length-4) !=".") throw "please enter actual dot";
   } catch (error) {
    emailerr.innerHTML=error;
   }
   //age validation
   const ageerr = document.getElementById("ageerror");
   ageerr.innerHTML = " ";
   try {
    if(age.trim()=="") throw "please enter your age";
    if(age < 18|| age > 75 ) throw "write age in between 18 to 75 years";
   } catch (error) {
    ageerr.innerHTML=error;
   }
   //phone number validation
   const phoneerr = document.getElementById("phoneerror");
   phoneerr.innerHTML= " ";
   try {
    if(phonenumber.trim()=="") throw "please fill the phone";
    if(phonenumber.length !=10) throw "mobile number should be 10 digid";
    if(isNaN(phonenumber)) throw "mobile number should contain only digid";
   } catch (error) {
    phoneerr.innerHTML=error;
   }
   //passward validation
   const passerr = document.getElementById("passerror");
   passerr.innerHTML= " ";
   try {
    if(passward.trim()=="") throw "please fill passward";
    if((passward.length < 3) || (passward.length > 20)) throw "please enter passward in between 3 to 20";
   } catch (error) {
    passerr.innerHTML=error;
   }
   //confirm passward validation
   const cpasserr = document.getElementById("cpasserror");
   cpasserr.innerHTML= " ";
   try {
    if(confirmpass.trim()=="") throw "please fill passward";
    if(passward !=confirmpass) throw "passward does not match";
   } catch (error) {
    cpasserr.innerHTML=error;
   }  
}
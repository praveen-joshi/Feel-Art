const express=require('express')
const {validateUser,User}=require('../models/user')
const _=require('lodash')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth')

const router=express.Router();

//Creating a new User
router.post('/register',async (req,res)=>{

    //we are using lodash _ to unwrap the object instead of JSON.stringify(req.body)
    //becoz a malicious user may send data with so many unnecesary paramaters
    //however latest version of joi also does this work so this will
    //happens automatically on validate user funcion here

    //find if the req.body contain all required valid  user details or not
    if(!validateUser(req.body)) return res.status(400)
    .send("Please Give all mandatory data of user also dont give extra data");

    //find if this user is alreasy registered
    let user=await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already Registered Please Try to Login");

    //create new object 
    user=new User(_.pick(req.body,['name','address','email','city','password']));
    user.cart=[];
    user.orders=[];
    //change password with hash of it 
    
    
    user.password=await getHasedPassword(user.password);
    await user.save();

    //get token and return it(not necessay for register)
    const token=getToken(user);
    res.header('x-auth-token',token).send("Returning you a Token in header to Login next time");
})


//Getting info of Current User
// body of req is set by the auth middle-ware since it was a post req to auth so here in get req 
// also we can use body set by auth 
router.get('/me',auth,async (req,res)=>{

    user=await User.findOne({_id:req.user._id}).select('-password');
    if(user) res.send(user);
    else res.status(400).send("This User is Not Available");

})

//Loggin User
router.post('/login',async (req,res)=>{
	console.log("A Loggin Request Came");
	
    const email=req.body.email;
    let password=req.body.password;
    if(!email || !password) return res.send("Please pass email and password to get token");
    
    user=await User.findOne({'email':email});
    if(!user) return res.status(400).send("This email is Not registered with us");

    if(! await bcrypt.compare(password,user.password)) return res.status(400).send("Wrong Password");

    const token=getToken(user);
    console.log("A user Logged In");
    res.send({token});
})

function getToken(user) {
    //take key from environment 
    //we are using config library to get this key
    //returning a token in respose for login(not necessay since its register request)
    jwtKey="praveenJoshi@12";
    token=jwt.sign(JSON.stringify(user),jwtKey);
    return token;
}

async function getHasedPassword(password) {
    const salt=await bcrypt.genSalt(10);
    const hasedPassword=await bcrypt.hash(password,salt);
    return hasedPassword;
    //warning this return different values for same string 
    //make sure to use compare method to check if two differenet hash is same
}


module.exports=router;
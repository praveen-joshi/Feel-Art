const { join } = require('lodash');
const joi=require('joi')
mongoose=require('mongoose')
product=require('./product')
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is required"],
        minLength: 3,
        maxLength: 50,
        tolower: true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:Boolean,
    address:{
        type:String,
        minLength:3,
        maxLength:500
    },
    city:{
        type:String,
        minLength:3,
        maxLength:500
    },
    email:{
        type:String,
        minLength:3,
        maxLength:500
    },
    cart:[{type: mongoose.Schema.Types.ObjectId,ref:'product'}],
    orders:[{type: mongoose.Schema.Types.ObjectId,ref:'Order'}]
});


const User=mongoose.model('User',userSchema);

function validateUser(user){
    const schema=joi.object({
        name:joi.string().max(250).required(),
        email: joi.string().max(250).required().email(),
        password:joi.string().max(250).required(),
        city:joi.string().max(250),
        address:joi.string().max(250)
    });

    const res=schema.validate(user);    
    if(res.error) return false;
    else return true;
}


exports.User=User;
exports.validateUser=validateUser;
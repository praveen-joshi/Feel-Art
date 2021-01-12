const { Schema } = require('mongoose');
const joi=require('joi')
mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    status:{
        type:String,
        enum:['Pending','Cancelled','Completed']
    },
    datePlaced:{
        type:Date,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    Amount:{
        type:Number,
        required:true
    }
});

const Order=mongoose.model('Order',orderSchema);
module.exports=Order;
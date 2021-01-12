const express=require('express')
const Order=require('../models/order')
const router=express.Router();
const auth=require('../middleware/auth')
const {User}=require('../models/user');
const {Product}=require('../models/product');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

//User can only add product or modify(Cancel Order) and can not cancel a part of order right now


//Only admin can change order status to sucessfull

//place order 
router.get('/',auth,async (req,res)=>{

    user=await User.findOne({_id:req.user._id});
    let cart=user.cart;

    if(cart.length<=0) return res.send("Add Something to Cart First");
    console.log(cart.length+"hi");

    let amount=0;
    for(let p in cart){
    	let item=await Product.findOne({_id:cart[p]._id});
    	if(!item) return res.send("Invalid or Unavailbale Item in Cart");
    	if(item.Qunatity<=0) return res.send("One of product in Cart is Out of Stock");
    	amount=amount+item.price;
    }



    for(let p in cart){
    	let item=await Product.findOne({_id:cart[p]._id});
  		item.Qunatity=item.Qunatity-1;
  		Product.findByIdAndUpdate(p._id,item);
    }

    order=new Order({
        status:'Pending',
        Products:cart,
        user:user._id,
        datePlaced:Date.now(),
        Amount:amount
    });

    user.orders.push(order);
    user.cart=[];
    await order.save();
    await User.findByIdAndUpdate(user._id,user);
    res.send("Order Placed");
})


//complate order by admin
router.get('/complete/:id',[auth,admin,validateObjectId],async (req,res)=>{
    order=await Order.findById(req.params.id);
    if(!order) return res.send("order Not found").status(404);

    if(order.status=="Cancelled") res.send("Ordered Was Cancelled").status(400);

    order.status="Completed";
    order.save();
    res.send("Order Complated");
})


//cancel
router.get('/cancel/:id',[auth,validateObjectId],async (req,res)=>{
    order=await Order.findById(req.params.id);
    if(!order) return res.send("order Not found").status(404);

    order.status="Cancelled";
    order.save();
    for(let p in order.Products){
    	let item=await Product.findOne({_id:p._id});

  		if(item) item.Qunatity=item.Qunatity+1;
  		Product.findByIdAndUpdate(p._id,item);
    }
    res.send("Order Cancelled");
})

//Get User orders
router.get('/myOrders',auth,async (req,res)=>{
	user=await User.findOne({_id:req.user._id});
	let userOrders=[]
	for(let orderId in req.user.orders){
		order=await Order.find({_id:req.user.orders[orderId]});
		userOrders.push(order);
	}
	
	res.send(userOrders);
})

//Get all orders
router.get('/list',auth,async (req,res)=>{
	orders=await Order.find();
	res.send(orders);
})



module.exports=router;
const express=require('express')
const {User}=require('../models/user')
const _=require('lodash')
const auth=require('../middleware/auth')
const {validateProduct,Product} = require('../models/product')
const validateObjectId = require('../middleware/validateObjectId')
const router=express.Router();
const multer=require('multer');
const admin = require('../middleware/admin');


//file storage logic starts here
var storage = multer.diskStorage({
    destination: 'static/products/',
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage })

//file storage logic end here

//Creating a new Product
router.post('/',[auth,admin,upload.single('image')],async (req,res)=>{
    console.log(req.body);
    if(!validateProduct(req.body) ) return res.status(400).send("Please Give all required data of Product also dont give extra data");
    console.log(req.body);
    product=new Product(req.body);
    product.image=req.file.originalname;
    product.save();
    console.log("Recently added a New product")
    res.send("New Product Added");
})

//Adding Product to Current User cart
router.get('/add_product/:id',[auth,validateObjectId],async (req,res)=>{

    user=await User.findOne({_id:req.user._id});

    //validate product
    product=await Product.findOne({_id:req.params.id})
    if(!product) return res.status(400).send("Invalid Product");

    if(product.Qunatity<=0) return res.status(400).send("Product is Already Out Of Stock");

    if(user.cart.indexOf(product._id)!=-1) return res.status(400).send("Product is Already Present in your Cart");

    //update
    user.cart.push(product._id);
    await User.findByIdAndUpdate(user._id,user);
    
    res.send("Product Added to cart");
})

//Removing Product from Current User cart
router.get('/remove_product/:id',[auth,validateObjectId],async (req,res)=>{
    console.log("Req to Remove from Cart Came");
    user=await User.findOne({_id:req.user._id});

    //validate product
    product=await Product.findOne({_id:req.params.id})
    if(!product) return res.status(400).send("Invalid Product");

    //update
    index=user.cart.indexOf(product._id);
    if(index>-1){
        user.cart.splice(index,1)
        res.send("Product Removed from cart");
    }
    else{
        res.send("Product already Not present in Cart");
    }
    
    await User.findByIdAndUpdate(user._id,user);  
})

//Get items of Currenet User Cart
router.get('/cart',auth,async (req,res)=>{
    user=await User.findOne({_id:req.user._id});
    cart=[];
    for(product in user.cart){
        item=await Product.findOne({_id:user.cart[product]});
        cart.push(item);
    }

    res.send(cart);
})

//list of all products
router.get('/',async (req,res)=>{
	//if products are in large number send only some products otherwise it will
	//take long time and bandwidth 
    allProducts=await Product.find();
    res.send(allProducts);
})

//Get specific Product by if
router.get('/:id',validateObjectId,async (req,res)=>{
    let product=await Product.findOne({_id:req.params.id});
    res.send(product);
})




module.exports=router;
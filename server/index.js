const express=require('express')
const mongoose=require('mongoose')
const user=require('./routes/user')
const order=require('./routes/order')
const product=require('./routes/product')
const cors=require('cors')
const app=express()

app.use(cors());
app.use(express.json());
app.use('/static',express.static('static/products'))
app.use(express.urlencoded({extended:true}))
app.use('/users',user);
app.use('/order',order);
app.use('/product',product)
app.listen(3000,(req,res)=>{
    console.log("Our Node Server is Running .........");
})
const port = process.env.PORT || 3000;
console.log(port);

mongoose.connect('mongodb://localhost/Feel',{useUnifiedTopology: true ,useNewUrlParser: true} )
    .then(()=>console.log("Connected to Mongo db....."))
    .catch(()=>console.log("Error in Mongo Connection...."))

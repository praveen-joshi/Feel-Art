mongoose=require('mongoose')
joi=require('joi')
const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Product name is required"],
        minLength: 3,
        maxLength: 50,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        maxLength: 20000
    },
    image: String,
    Qunatity: 
    {
        type:Number,
        min:0,
        require:true,

    }
});

const Product=mongoose.model('Product',productSchema);

function validateProduct(product){
    const schema=joi.object({
        name:joi.string().max(250).required(),
        price: joi.number().required(),
        description:joi.string().max(1250),
        image:joi.string().max(250),
        Quantity:joi.number()
    });
    if(!product.Quantity) product.Quantity=1;
    const res=schema.validate(product);    
    if(res.error)
    { 
        console.log(res.error);
        return false;
    }
    else return true;
}



exports.Product=Product;
exports.productSchema=productSchema;
exports.validateProduct=validateProduct;
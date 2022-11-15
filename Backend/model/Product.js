const mongoose= require('mongoose');

const productSchema= new mongoose.Schema({
    product_name:{
        type:String,
        require:true
    },
    product_price:{
        type:Number,
        require:true
    },
    product_category:{
        type:String,
        default:null
    },
    product_userId:{
        type:String,
        require:true
    },
    product_company:{
        type:String,
        default:null
    }
});

module.exports= mongoose.model("products",productSchema);
const mongoose= require('mongoose');

const productSchema = new  mongoose.Schema({
    productName : {
        type : String,
        required : true,
    },
    productCategory : {
        type : String,
        required : true,
    },
    price:{
        type : Number,
        unique : false,
        required : true,     
    },
    availQuantity :{
        type : Number,
        required: true,
    },
    brand :{
        type : String,
        required: true,
    },
    color :{
        type : String,
    }
});

const productModel= mongoose.model("product",productSchema);

module.exports = productModel;
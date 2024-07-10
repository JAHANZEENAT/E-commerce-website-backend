const mongoose= require('mongoose');

const shoppingCartSchema = new  mongoose.Schema({
    productId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    Quantity :{
        type : Number
    }
});

const shoppingCartModel= mongoose.model("cart",shoppingCartSchema);

module.exports = shoppingCartModel;
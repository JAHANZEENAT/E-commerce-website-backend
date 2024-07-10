const express = require("express");
const router = express.Router();
const productModel = require('../models/product.js')
const shoppingCartModel = require('../models/shoppingCart.js')
router.post('/addItemsToCart',async(req,res)=>{
    const {productName,quant} = req.body;
    const regex = new RegExp(productName, 'i'); // 'i' for case-insensitive
    const product = await productModel.find({ productName: regex });
  if (!product || product[0].availQuantity<quant) {
        console.log("Not available")
        res.status(401).json({
          error: "Not available !",
        })
      } else {
        console.log(`${product.length} products found`)
        await shoppingCartModel.create({productId : product[0]._id,
          userId : req.session.userid,
          Quantity:quant})
        await productModel.updateOne({ _id: product[0]._id }, { $inc: { availQuantity: -quant } })
        res.status(200).send({msg : `This ${product} added to your cart successfully !`})
      }
})

router.post('/removeItemsFromCart',async(req,res)=>{
  const {productName} = req.body;
  const regex = new RegExp(productName, 'i'); 
  const product = await productModel.find({ productName: regex });

  const item= await shoppingCartModel.findOneAndDelete({productId : product[0]._id,
    userId : req.session.userid})

    res.status(200).send({msg : "item deleted successfully !"})
   await productModel.updateOne({ _id: product[0]._id }, { $inc: { availQuantity: +item.Quantity } })
})
module.exports = router;
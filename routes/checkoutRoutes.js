const express = require("express");
const router = express.Router();
const productModel = require('../models/product.js')
const userModel = require('../models/user.js')
const checkoutModel = require('../models/checkout.js')
const shoppingCartModel = require('../models/shoppingCart.js')

router.use(express.json());

router.post('/checkout', async (req, res) => {
    const cartItem = await shoppingCartModel.findOne({userId: req.session.userid})
    if(cartItem!= null){
      try {
        const {  productId, address, payment, status } = req.body;
    
        // Fetch the user details
        const user = await userModel.findById(req.session.userid).select('firstName lastName').exec();
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        // Fetch the product details
        const product = await productModel.findById(productId).select('productId price').exec();
        if (!product) {
          return res.status(404).send('Product not found');
        }
    
        // Create a new checkout document
        const newCheckout = await checkoutModel.create({
          firstname: user.firstName,
          lastname: user.lastName,
          productId: product._id,
          address: address,
          amount: product.price,
          payment: payment,
          status: status
        });
    
        res.status(201).send('Checkout created successfully');
      } catch (err) {
        console.error('Error:', err);
        res.status(500).send(err.message);
      }
    }
    else{
      res.status(500).send("Your cart is empty");
    }
  
});
router.get('/orderhistory',async(req,res)=>{
  const history = await checkoutModel.find(req.session.userid)
  if(history){
    res.status(200).send({
      history
    })
  }
  else{
    res.status(500).send("no previous order");
  }
})

module.exports = router;
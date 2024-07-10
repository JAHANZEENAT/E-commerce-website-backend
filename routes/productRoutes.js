const express = require("express");
const router = express.Router();
const productModel = require('../models/product.js')
const userModel = require('../models/user.js')
const fs = require('fs')
const path = require('path')


router.use(express.json());


router.post('/createProduct', async (req, res) => {
  const user= await userModel.findById(req.session.userid)
    if(user.userType=='Admin'){
      try {
        function readDataFromFile() {
          const filePath = path.join(__dirname, '../data/products.json')
          const data = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(data).products;
        }
    
        const products = readDataFromFile();
    
        if (products.length > 0) {
          const insertResult = await productModel.insertMany(products);
          console.log('Inserted documents =>', insertResult.length);
          res.status(200).send('Products inserted successfully');
        } else {
          console.log('No products to insert');
          res.status(200).send('No products to insert');
        }
      } catch (error) {
        console.error('Error inserting products', error);
        res.status(500).send('Error inserting products');
      }
      return res.status(201).send({msg:"success"})
    }
    else{
      return res.send({error:"You're not admin"})
  }
});
    
 

router.get('/searchProduct',async(req,res)=>{
    const {productName} = req.body;
    const regex = new RegExp(productName, 'i'); // 'i' for case-insensitive
    const product = await productModel.find({ productName: regex });
  if (!product) {
        console.log("Not such product found!")
        res.status(401).json({
          error: "No such product found!",
        })
      } else {
        console.log(`${product.length} products found`)
        res.status(200).json({
          product
        })
      }
})

router.get('/filterProducts', async (req, res) => {
  const { category, minPrice, maxPrice } = req.body;

  let filter = {};

  // Apply filters based on query parameters
  if (category) {
    filter.productCategory = category;
  }

  // Initialize price filter if minPrice or maxPrice is provided
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = parseFloat(maxPrice);
    }
  }

  console.log('Filter Object:', filter); // Logging filter for debugging

  try {
    const products = await productModel.find(filter);

    if (products.length === 0) {
      console.log('No products found');
      return res.status(404).json({ message: "No products found" });
    }

    console.log('Products found:', products.length);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error occurred while filtering products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router ;
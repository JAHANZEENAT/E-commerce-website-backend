const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 8000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const shoppingRoutes = require('./routes/shoppingRoutes.js')
const checkoutRoutes = require('./routes/checkoutRoutes.js')

mongoose.connect("mongodb://localhost:27017/project")

app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended : false }));
app.use(session({
  secret: 'zeenat1111', // Change this to a random secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use("/",userRoutes);
app.use("/",productRoutes);
app.use('/',shoppingRoutes);
app.use('/',checkoutRoutes);
app.listen(PORT,()=>{
    console.log(`server is listening to ${PORT}`);
})
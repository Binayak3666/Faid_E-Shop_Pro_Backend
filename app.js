const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

require('dotenv/config');

const api = process.env.API_URL;

// middleware
app.use(express.json())
app.use(morgan('tiny'))
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type:Number,
    required: true 
  }
});
const Product = mongoose.model('Product',productSchema)

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });



app.get(`${api}+/products`, async (req, res, next)=>{
    const product = await Product.find();
    res.send(product)
})
app.post(`${api}+/products`, (req, res, next)=>{
    const product  =new Product({
      name : req.body.name,
      image: req.body.image,
      countInStock: req.body.countInStock
    }) 
    product.save().then((createPost =>
      res.status(200).json(createPost)
    )).catch((err)=>{
      res.status(501).json({
        message: err,
        success: false
      })
    })
})



app.listen(3030,()=>{
    console.log("server is starting now in http://localhost:3030");
})

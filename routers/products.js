const express = require('express');
const router = express.Router();

const {Product} = require('../models/product')

router.get('/', async (req, res, next)=>{
    const product = await Product.find();
    res.send(product)
})
router.post('/', (req, res, next)=>{
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

module.exports = router
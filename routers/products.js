
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const {Product} = require('../models/product');
const mongoose = require('mongoose')


router.get('/', async (req, res, next)=>{
    let filter ={}
    if(req.query.categories){
      filter = {category: req.query.categories.split(',')}
    }
    const product = await Product.find(filter).populate('category');
    if(!product){
      return res.status(500).send('The product cannot bis not available')
    }
    res.send(product);
});

router.get('/:id', async (req, res, next)=>{
  let product = await Product.findById(req.params.id).populate('category');
  if(!product){
    return res.status(500).send('The product cannot bis not available')
  }
  res.send(product);
});

router.post(`/`, async (req, res) =>{
  const category = await Category.findById(req.body.category);
  if(!category) return res.status(400).send('Invalid Category')

  let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
  })
  product = await product.save();
  if(!product) 
  return res.status(500).send('The product cannot be created')

  res.send(product);
})

router.put('/:id', async(req,res)=>{
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid product Id')
  }
  const category = await Category.findById(req.body.category);
  if(!category) return res.status(400).send('Invalid Category')

  const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      {new:true}
  )
  if(!product) {
      res.status(500).json({success: false})
  } 
  res.status(200).send(product);
})

router.delete('/:id',(req,res)=>{
  Product.findByIdAndDelete(req.params.id).then((product)=>{
      if(product){
          res.status(200).json({success: true ,message:'the product deleted'})
      }else{
          res.status(404).json({success:false, message:'product not found'})
      }
  }).catch(err =>{
      res.status(400).json({success: false, message: 'product not not found',error:err})
  })
})

router.get('/get/count', async (req, res, next)=>{
  const productCount = await Product.countDocuments();
  if(!productCount){
    return res.status(500).send('The product count is not available')
  }
  res.send({productCount: productCount});
});

router.get('/get/featured/:count', async (req, res, next)=>{
  const count = req.params.count ? req.params.count : 0
  const product = await Product.find({isFeatured:true}).limit(+count)
  if(!product){
    return res.status(500).send('The product count is not available')
  }
  res.send({product: product});
});

module.exports = router
const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.send(categoryList);
})

router.post('/',async (req, res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    //one way to create
    category = await category.save()
    !category?res.status(404).send('category did\'t created!'):res.status(200).json({message: 'data insert successfully', data:category})     
    
    //second way to create
    // category.save().then((resData)=>{
    //     res.status(200).json({
    //         message: 'data insert successfully',
    //         data:resData
    //     })
    // }).catch((err)=>{
    //     res.status(500).json({
    //         message:err,
    //         success: 'failed'
    //     })
    // })
    
    
})
module.exports =router;
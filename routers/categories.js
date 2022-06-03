const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
})

router.get('/:id', async (req, res)=>{
    const category = await Category.findById(req.params.id);
    if(category){
        res.status(200).json({success:true, data:category})
    }
     
})

router.post('/',async (req, res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category.save().then((resData)=>{
        res.status(200).json({
            message: 'data insert successfully',
            data:resData
        })
    }).catch((err)=>{
        res.status(500).json({
            message:err,
            success: 'failed'
        })
    })    
})

router.delete('/:id',(req,res)=>{
    Category.findByIdAndDelete(req.params.id).then((category)=>{
        if(category){
            res.status(200).json({success: true ,message:'the category deleted'})
        }else{
            res.status(404).json({success:false, message:'category not found'})
        }
    }).catch(err =>{
        res.status(400).json({success: false, message: 'category not not found',error:err})
    })
})

module.exports =router;
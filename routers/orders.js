const { Orders } = require("../models/order");
const express = require("express");
const router = express.Router();
const { OrderItems } = require("../models/order-item");

router.get(`/`, async (req, res) => {
  const orderList = await Orders.find().populate('user', 'name email isAdmin').sort({'dateOrdered':-1});
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.get(`/:id`, async (req, res) => {
    const order = await Orders.findById(req.params.id)    
    .populate('user', 'name email isAdmin')
    .populate({path:'orderItems',populate:{path:'product',populate:'category'} });//three inner pupulate
    // .populate('orderItems') //two different populate
    // .populate({path:'product',populate:'product'})//two inner pupulate
    
    if (!order) {
      res.status(500).json({ success: false });
    }
    res.send(order);
  });

router.post("/", async (req, res) => {
    const orderItemsIds = await Promise.all(req.body.orderItems.map(async orderitems =>{
        let newOrderItem =  new OrderItems({
            quantity: orderitems.quantity,
            product: orderitems.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }))
    console.log(orderItemsIds)
  let order = new Orders({
    orderItems: orderItemsIds,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });
  order = await order.save();

  if (!order) return res.status(400).send("the order cannot be created!");

  res.send(order);
});

router.put('/:id', async(req,res)=>{
    const updateOrderStatus = await Orders.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        {new:true}
    )
    if(!updateOrderStatus) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(updateOrderStatus);
})

router.delete('/:id',(req,res)=>{
    Orders.findByIdAndDelete(req.params.id).then(async(order)=>{
        if(order){
            // here inner collection (orderItems has to delete) delete
            await order.orderItems.map(async orderitem =>{
                await OrderItems.findByIdAndRemove(orderitem)
            })
            res.status(200).json({success: true ,message:'the order deleted'})
        }else{
            res.status(404).json({success:false, message:'order not found'})
        }
    }).catch(err =>{
        res.status(400).json({success: false, message: 'order not not found',error:err})
    })
})

module.exports = router;

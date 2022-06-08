const { Orders } = require("../models/order");
const express = require("express");
const router = express.Router();
const { OrderItems } = require("../models/order-item");

router.get(`/`, async (req, res) => {
  const orderList = await Orders.find();
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.post("/", async (req, res) => {
    const orderItemsIds = req.body.orderItems.map(async orderitems =>{
        let newOrderItem =  new OrderItems({
            quantity: orderitems.quantity,
            product: orderitems.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    })
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
//   order = await order.save();

  if (!order) return res.status(400).send("the order cannot be created!");

  res.send(order);
});

module.exports = router;

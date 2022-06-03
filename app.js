const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// const {Product} = require('./models/product')
const productsRoute = require('./routers/products')


require('dotenv/config');

const api = process.env.API_URL;

// middleware
app.use(express.json())
app.use(morgan('tiny'))


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });


app.use(`${api}+/products`,productsRoute)



app.listen(3030,()=>{
    console.log("server is starting now in http://localhost:3030");
})

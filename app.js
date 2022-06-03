const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// all api call reditect to router here
const productsRoute = require('./routers/products')

// .env file config here
require('dotenv/config');
const api = process.env.API_URL;

// middleware
app.use(express.json())
app.use(morgan('tiny'))

// api goes here
app.use(`${api}+/products`,productsRoute)

// mongo connnection 
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });

//local server running here 
app.listen(3030,()=>{
    console.log("server is starting now in http://localhost:3030");
})

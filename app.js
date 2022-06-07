const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler');

// for cross domain issue
const cors = require('cors');

app.use(cors());
app.options('*', cors())

// .env file config here
require('dotenv/config');
const api = process.env.API_URL;

// middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(errorHandler)

// all api call reditect to router here
const productsRoute = require('./routers/products');
const categoriesRoute = require('./routers/categories');
const oredrRoute = require('./routers/orders');
const userRoute = require('./routers/users')

// api goes here
app.use(`${api}+/products`,productsRoute)
app.use(`${api}+/categories`,categoriesRoute)
app.use(`${api}+/orders`,oredrRoute)
app.use(`${api}+/users`,userRoute)

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

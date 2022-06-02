const express = require('express');
const app = express();
const morgan = require('morgan')

require('dotenv/config');

const api = process.env.API_URL;

// middleware
app.use(express.json())
app.use(morgan('tiny'))

app.get(`${api}+/products`, (req, res, next)=>{
    const product = {
        id:1,
        name:"hair Dresser",
        image:"some Url"
    }
    res.send(product)
})
app.post(`${api}+/products`, (req, res, next)=>{
    const newProduct = req.body;
    console.log(newProduct)
    res.send(newProduct)
})

app.listen(3030,()=>{
    console.log("server is starting now in http://localhost:3030");
})
const express = require('express');
const app = express();

require('dotenv/config');
const api = process.env.API_URL;

app.get(`${api}+/products`, (req, res, next)=>{
    const product = {
        id:1,
        name:"hair Dresser",
        image:"some Url"
    }
    res.send(product)
})

app.listen(3030,()=>{
    console.log("server is starting now in http://localhost:3030");
})
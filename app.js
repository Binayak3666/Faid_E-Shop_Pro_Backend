const express = require('express');
const app = express();

require('dotenv/config');
const api = process.env.API_URL;

//http://localhost:3030/api/v1/products
app.get('/', (req, res, next)=>{
    res.send('hello Api')
})

app.listen(3030,()=>{
    console.log(api)
    console.log("server is starting now in http://localhost:3030");
})
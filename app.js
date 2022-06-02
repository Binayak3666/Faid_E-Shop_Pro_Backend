const express = require('express');
const app = express();

app.get('/', (req, res, next)=>{
    res.send('hello Api')
})

app.listen(3030,()=>{
    console.log("server is starting now in http://localhost:3030");
})
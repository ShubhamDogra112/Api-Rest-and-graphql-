const express = require('express'),
        app = express()
        bodyParser = require('body-parser')
        Mongoose = require('mongoose')
        jwt = require('jsonwebtoken')
        cors = require('cors')
        postRoutes =  require("./routes/post")
        authRoutes  = require('./routes/auth')
require('dotenv').config()

// optional cors syntaz
// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*')
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
//     res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')

// })
app.use(cors())
app.use(bodyParser.json())



// after all the routes


app.use(postRoutes)
app.use(authRoutes)
app.use((req , res , next)=>{

    let err = new Error("Not Found")
    err.status = 404
    next(err);

})


app.use((err,req,res,next)=>{

    if(err.message === "jwt malformed"){
        err.message = "Invalid jwt token"
    }
return res.status(err.status||500).json({
    error:{
        message:err.message||"Oops something went wrng"
    }

})
   
})

const Port = process.env.PORT||3000

Mongoose.connect(process.env.dBURL)
.then(res=>{

    app.listen(Port , ()=>{
        console.log(`Server is started at port ${Port}`)
    })
})

.catch(err=>{
    console.log(err)
})
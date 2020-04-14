const express = require("express")
     app = express()
     cors = require("cors")
     mongoose = require("mongoose")
     jwt = require("jsonwebtoken")
     bodyParser = require("body-parser")
     Port = process.env.PORT || 3000
     graphqlHttp = require("express-graphql")
     graphqlSchema = require("./graphql/schema")
     graphqlResolver = require("./graphql/resolver")



app.use(cors())
app.use(bodyParser.json())


app.use("/graphql" , graphqlHttp({

    schema:graphqlSchema,
    rootValue:graphqlResolver,
    graphiql:true,

    formatError:(err)=>{
        if(!err.originalError){
            return err
        }

        const status = err.originalError.status || 500
        const message = err.message || "Oops something went wrong"
        return {
            message:message,
            status:status

        }
    }



}))

app.use((req,res,next)=>{
    let err = new Error("Not found")
     err.status = 404
     next(err)
})


app.use((err,req,res,next)=>{

   return res.status(err.status||500).json({
        message:err.message||"Oops something went wrong",
        status:err.status
    })

    
})

mongoose.connect("mongodb+srv://Shubham:shubham@cluster0-77hwr.mongodb.net/test")
.then(res=>{
    app.listen(Port,()=>{
        console.log(`Server is started at port ${Port} `)

    })

})
.catch(err=>{
    console.log(err)
})

   

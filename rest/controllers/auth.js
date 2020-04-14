const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


exports.signUp = async(req,res,next)=>{

    let email = req.body.email
    let password  = req.body.password

    try{
        let user =  await User.findOne({email:email})

        if(user){
            let err  = new Error("Email already exist")
            err.status = 400
            throw(err)
        }

        

            

            let hashPass = await bcrypt.hash(password,12)

            let newUser = new User({
                email:email,
                password:hashPass
            })

            let newuser = await newUser.save()
    

            let token = jwt.sign({
                email:newuser.email,
                userId:newuser._id.toString()

            }, "somesupersecret",{
                expiresIn:"1h"
            })

            res.status(201).json({
                message:'new user created',
                email:newuser.email,
                token:token,
                id:newuser._id.toString()
            })



            

        
    }
    catch(err){
        next(err)
    }

}


exports.login = async(req,res,next)=>{



    let email = req.body.email
    let password  = req.body.password

    try{

    let foundUser = await User.findOne({email:email})

    if(!foundUser){
        let err  = new Error("Invalid email")
        email.status = 404
        throw(err)
    }

    let isEqual = await bcrypt.compare(password , foundUser.password)

    if(!isEqual){
        let err = new Error("Invalid email or password")
        err.status = 401
        throw(err)
    }

    const token = jwt.sign({
        email:foundUser.email,
        userId:foundUser._id.toString()
    }, "somesupersecret",{expiresIn:'1h'})

    res.status(200).json({
        token:token,
        userId:foundUser._id.toString(),
        message:"user logged in"
    })


    }
    catch(err){
        next(err)
    }


}
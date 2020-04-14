const User = require("../models/user")
const Post = require("../models/post")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports = {
    
     createUser: async function({userData},req ){

        

            let foundUser = await User.findOne({email:userData.email})

            if(foundUser){
            
                let err = new Error("Email already exist")
                err.status = 400
                throw(err)
            }

            const hashPass = await bcrypt.hash(userData.password , 12)

            const user = new User({
                password:hashPass,
                email:userData.email
            })

            let newUser = await user.save()

            let token = jwt.sign({
                userId:newUser._id,
                email:newUser.email,
                },"somesupersecret",{
                    expiresIn:"1h"
                })

                return({...newUser._doc , token:token , _id:newUser._id})





        

       



    },

    hello(){
        return {
            text:'Hello World',
            val:1234
        }
    }

    ,

    login:async function({email , password}){

        let foundUser = await User.findOne({email:email})

        if(!foundUser){
             let err = new Error("No user exist with this email")
             err.status = 401
             throw(err)
        }

        let doMatch = await bcrypt.compare(password , foundUser.password)

        if(!doMatch){

            let err = new Error("Invalid email or password")
            err.status = 401
            throw(err)



        }

        let token = jwt.sign({
            userId:foundUser._id,
            email:foundUser.email,
            },"somesupersecret",{
                expiresIn:"1h"
            })

            return({
                userId:foundUser._id.toString(),
                token:token
            })



        


    },


    createPost: async function({title,content}){

        let post = new Post({
            title:title,
            content:content
        })

        let newPost=  await post.save()
        console.log(newPost)

        return{
            message:"Post created successfully",
            postId:newPost._id.toString()
        }

    },

    loadPost: async function(){

        let posts = await Post.find()

        return{
            posts:posts.map(p=>{
               return {...p._doc,
                _id:p._id.toString()
            }

            })
        }
    }
}
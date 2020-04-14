const Post = require("../models/post")

exports.showPost = async(req,res,next)=>{

    try{

    let posts = await Post.find()

    console.log(req.isAuthenticated)
    console.log(req.userId)


    res.status(200).json({
        posts:posts
    })

    }
    catch(err){
        next(err)
    }
}


exports.newPost = async(req,res,next)=>{
    let {title , content}  = req.body

    let post = new Post({
        title:title,
        content:content
    })

    try{

    let createdPost = await post.save()

    res.status(201).json({
        post:createdPost,
        message:"New Post added To database"
    })
    

    }
    catch(err){
        return next(err)
    }



}

exports.updatePost = async(req,res,next)=>{
    let content = req.body.content
    let title = req.body.title
    let post = {
        title:title,
        content:content
    }
    
     try{

        let updatedPost = await Post.findByIdAndUpdate(req.params.id,post)

        if(!updatedPost){
            let error = new Error("Post not found")
            error.status = 404
            throw(error)
        }
        res.status(201).json({
            message:'Post Updated Successfully'
        })
     }
     catch(err){
         next(err)
     }

    
}

exports.deletePost = async(req,res,next)=>{

    try{
    let deletedPost = await Post.findByIdAndRemove(req.params.id)

    if(!deletedPost){
        let error = new Error("Post not found")
        error.status = 404
        throw(error)
    }

        res.status(202).json({
            message:"post deleted",
            post:deletedPost
        })

    }
    catch(err){
        next(err)
    }
}
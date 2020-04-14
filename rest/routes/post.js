const express = require('express')
    router = express.Router()
    postController  = require("../controllers/post")
const isAuth = require("../middleware/auth")




router.get("/post",isAuth,postController.showPost)


router.post("/post/new",postController.newPost)

router.put("/post/:id",isAuth ,postController.updatePost)

router.delete("/post/:id" ,postController.deletePost)



module.exports = router
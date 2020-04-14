const express = require('express')
       app = express()
       router = express.Router()
       authController = require("../controllers/auth")
       
       


router.post("/signup",authController.signUp)

router.post("/login",authController.login)

module.exports = router
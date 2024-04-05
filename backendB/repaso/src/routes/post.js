const express = require ('express')
const router = express.Router()
const Message = require ('../models/message')
const User = require('../models/users')
const Post= require('../models/post')
const authMiddlewares = require ('../middlewares/auth')


router.post('/', async (req, res) =>{
    try {
        const post= req.body
        const newPost = await Post.create(post)
        await newPost.save()
        //TODO create user
        res.status(201).send({message:"user created", data: newPost})
    } catch (error) {
       res.status(400).send({message:error}) 
    }
    })
    


module.exports = router
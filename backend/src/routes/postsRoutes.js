const express = require('express');
const router = express.Router();
//const validUserId = require('../middlewares/auth')
const Posts = require('../models/postsModel');

// Get - Todas las publicaciones
router.get('/', async (req, res)=>{
    try{
        const posts = await Posts.find();
        res.send({message: 'Posts', data:posts});
    }
    catch (error){
            res.status(400).send({message:error});
    }
})


// Post - Publicación nueva
router.post('/', async(req, res) => {
    try {
        let post = req.body;
        const newPost = await Posts.create(post);
        await newPost.save();
        res.status(201).send({message: "Post created", data: newPost});
    } catch (error) {
        res.status(400).send({message: error});
    }
})

/*
router.post('/', async(req, res) => {
    try {
        let post = req.body;
        let token = req.body.token;
        if(!token) {
            res.status(400).send({message: "Necesitas hacer login primero"});
        } else{
            const newPost = await Posts.create(post);
            await newPost.save();
            res.status(201).send({message: "Post created", data: newPost});
        }
    } catch (error) {
        res.status(400).send({message: error});
    }
})
*/



// Put - actualiza publicaciones
router.put('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const post = req.body;
        const posts = await Posts.findByIdAndUpdate(id, post, {returnOriginal:false});
        await Posts.findByIdAndDelete(id);
        res.send({message:'Post modified', data:posts});
    }
    catch(error){
        res.status(400).send({message:error});
    }
})

// Delete - Elimina publicaciones
router.delete('/:id', async (req, res)=>{
    try{
        const{id} = req.params;
        await Posts.findByIdAndDelete(id);
        res.send({message:"Message deleted"});
    }
    catch(error){
        res.status(400).send({message:error});
    }
})

module.exports = router;
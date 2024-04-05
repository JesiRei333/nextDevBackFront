const express = require('express')
const router = express.Router()
//const authMiddlewares = require('../middlewares/auth')
const User = require('../models/usersModel')

router.post('/login', async(req, res) => {
    try {
        const user = {email, password} = req.body
        // db : body
        const users = await User.findOne({email: email});
        // recibe = password en texto plano, y, hash.
        if (!user || !(await User.isValidPassword(password, users.password))) {
            res.status(401).send({message: "Invalid email or password"});
        } else {
            const token = await User.createToken({_id: user._id, first_name: user.first_name})
            res.status(201).send({message: "Login Success", data: token })
        }
    } catch (error) {
        res.status(400).send({message: error});
    }
})

router.post('/create', async (req, res)=>{
    try{
        let user = req.body
        user.password = await User.encryptPassword(user.password)
        const newUser = await User.create(user)
        newUser.save()  
        res.status(201).send({message:`User created ${newUser}`})
    }
    catch (error){
        res.status(400).send({message:error})
    }
})

router.get('/key', async (req, res)=>{
    try{
        const users = await User.find()
        res.send({message: 'All users', data:users})
    }
    catch (error){
            res.status(400).send({message:error})
    }
})

async function isUser (res,req,next){
    if (req.user.role == "user") {
        next() 
    } else {
        res.status(401).send({message: "user not admin"})
    }
}

module.exports = router
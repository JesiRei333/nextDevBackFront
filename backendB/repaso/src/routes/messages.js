const express = require ('express')
const router = express.Router()
const Message = require ('../models/message')
const User = require('../models/users')
const authMiddlewares = require ('../middlewares/auth')



router.get('/', async (req, res)=>{
    try {
        const messages = await Message.find()
        res.status(200).send({messagge : 'all message', data: messages})
    } catch (error) {
        res.status(400).send({messagge : error})
    }
})

// chats si el usuario existe y esta logeado
router.get('/chats/:id', authMiddlewares.validUserId, async (req, res)=>{
    try {

        const {id}=req.params
        const toUser = await User.findById(id) 
        const messageSend = await Message.find({from: req.user.first_name, to: toUser.first_name})
        const messageRecive = await Message.find({to: req.user.first_name, from: toUser.first_name})
        let allMessage= messageSend.concat(messageRecive)

        res.send ({message: "all message", data: allMessage.sort((a,b)=>b.createdAt - a.createdAt)})
        
    } catch (error) {
        res.status(400).send({messagge : error})
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const messages = await Message.findById(id)
        res.status(200).send({messagge : 'A message', data: messages})
        
    } catch (error) {
        res.status(400).send({messagge : error})
    }
})

//post con validacion
router.post('/:toid', authMiddlewares.validUserId, async (req, res)=>{
    try {
        let message = req.body
        const {toid} =req.params
        message.from=req.user.first_name
        const toUser = await User.findById(toid) 

        if (!toUser){
            res.status(400).send({messagge : 'Message not created'})
       
        } else{

            message.to=toUser.first_name
            const newMessage = await Message.create(message)
            await newMessage.save()
            console.log (message)
            res.status(201).send({messagge : 'Message created', data: newMessage})

        }
    } catch (error) {
        res.status(400).send({messagge : error})
    }
})


router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const message=req.body
        const messages = await Message.findByIdAndUpdate(id, message, {returnOriginal:false})
        res.send({messagge : 'message update', data: messages})

    } catch (error) {
        res.status(400).send({messagge : error})
    }
})


router.delete('/:id', async (req, res)=>{
    try {
        const { id } = req.params
        await Message.findByIdAndDelete(id)
     res.send({messagge : 'message deleted'})

        
    } catch (error) {
        res.status(400).send({messagge : error})
    }
})





module.exports = router
const express = require ('express')
const router = express.Router()
//const userUseCase= require ('../utils/userUseCase')
const authMiddlewares=require('../middlewares/auth')
const User = require ('../models/users')


router.post('/', async (req, res) =>{
try {
    let user= req.body
     user.password= await User.encryptPassword(user.password)
    const newUser = await User.create(user)
    await newUser.save()
    //TODO create user
    res.status(201).send({message:"user created", data: newUser})
} catch (error) {
   res.status(400).send({message:error}) 
}
})

//hacer un loging
router.post('/login', async (req, res) =>{

    try {
        const {email, password}=  req.body
        const user = await User.findOne ({email: email}) //busca por correo

        if (!user || !(await User.isValidPassword(password, user.password))){ //primero recibe texto plano y luego el hash en ese orden
            res.status(401).send({message: 'password or email invalid '})
        }else{
            //TODO create token
            const token = await User.createToken({_id: user._id, first_name: user.first_name})
            res.status(200).send({message:"loging seccess", data: token})
        }
        
    } catch (error) {
       res.status(400).send({message:error}) 
    }
    })

//

router.get('/', async (req, res) =>{
try {
    const user = await User.find()
    //TODO ger users
   res.send({message:"All users", data: user})
} catch (error) {
   res.status(400).send({message:error}) 
}
})

// llamar un usuario por su email
router.get('/:email', async (req, res) =>{
    try {
        const {email} = req.params
        const user = await User.find ({email: email})
        //TODO ger users
       res.send({message:"All users", data: user})
    } catch (error) {
       res.status(400).send({message:error}) 
    }
    })
//





router.put('/:id', authMiddlewares.validUserId, async (req, res) =>{ //contiene el middleware
    try {
        const user = req.body
        const {id} = req.params
        //TODO update user
        const updateUser = await User.findByIdAndUpdate (id, user, {returnOriginal:false})
        res.send({message: "user updated", data: updateUser})
        
    } catch (error) {
       res.status(400).send({message:error}) 
    }
    })


router.delete('/:id', async (req, res) =>{
try {
    const {id} = req.params
    await User.findByIdAndDelete(id)
    //TODO delete user
    res.send({message: "user deleted"})
} catch (error) {
   res.status(400).send({message:error}) 
}
})    

module.exports=router
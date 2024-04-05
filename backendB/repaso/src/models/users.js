const mongoose = require ('mongoose') 
const bcrypt = require ('bcrypt')
const jwt= require ('jsonwebtoken')


const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        match: [/^[a-zA-Z]+$/, 'Character not valid']
    },
    last_name: {
        type: String,
    match: [/^[a-zA-Z]+$/, 'Character not valid']
    },
     email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email not valid']
     },
     gender: {
        type: String,
        enum: ['Male', 'Female']
     },
     password:{
        type: String,
        required: true
     },
     phone:{
        type: String,
        match: [/ ^[0-9]+$/, 'Phone number not valid']
     }
 
},

    {    timestamps: true, //con esto activa el registro de fechas
         statics:{
            encryptPassword:async (password)=> {
               const salt= await bcrypt.genSalt(15) //cifra
               return await bcrypt.hash(password, salt)
            },
            isValidPassword: async (password, hash) =>{
               return await bcrypt.compare(password, hash)
            },
            createToken : async(payload)=>{
               return jwt.sign (payload, process.env.JWT_SIGN, {expiresIn: '2d'}) //expires el tiempo 30d 1hr

            }
         }
    }
)
//users es la coleccion y userSquema lo que acabamos de crear
const User = mongoose.model('users', userSchema) //modelo

module.exports = User;
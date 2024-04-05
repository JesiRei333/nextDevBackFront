const mongoose = require ('mongoose') 
//const bcrypt = require ('bcrypt')
//const jwt= require ('jsonwebtoken')


const postSchema = new mongoose.Schema({
     message :{
        type: String,
        required: true
     }
 
}

)
//users es la coleccion y userSquema lo que acabamos de crear
const Post = mongoose.model('post', postSchema) //modelo

module.exports = Post;
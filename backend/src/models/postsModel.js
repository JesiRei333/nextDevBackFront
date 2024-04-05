const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema ({
    nombreAleatorio:{
        type:String,
    }, 
    titulo:{
        type:String,
    },
    articulo:{
        type:String,
    },
    diaAleatorio:{
        type:String, 
    },
    numAleatorio:{
        type:String, 
    },
    tiempo:{
        type:String,
    },
    fecha:{
        type:String, 
    },
    fechaAleatoria: {
        type: String,
    }
},
    {
        timestamps:true
    }
)

const Posts = mongoose.model('posts', postsSchema);

module.exports= Posts;
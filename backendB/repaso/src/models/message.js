const mongoose= require('mongoose')

const messageSchema = new mongoose.Schema({
to: {
    type : String,
    required: true
},
from :{
    type: String,
    required:true
},
message: {
    type:String,
    require: true
}
},

{
    timestamps:true
}

)
const Message = mongoose.model('messges',messageSchema)// los modelos van en mayusculas
module.exports= Message
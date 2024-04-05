const User = require('../models/users')
const jwt= require ('jsonwebtoken')

const validUserId = async (req, res, next) => {
   
    //const { id } = req.params
   // const user= await User.findById(userid)
try {
    const { authorization } = req.headers
    const token = authorization.split(' ') [1]
    let decode=jwt.verify(token,process.env.JWT_SIGN)
    let dateNow = new Date()
    if (decode.exp < dateNow.getDate()/1000) {
        res.status(401).send({message: "session is expirated"}) 
    } else{
        req.user = decode
        next ()
    }
    
} catch (error) {
    res.status(401).send({message: "login ins required"}) 
}
}


/*
async function isAdmin (res,req,next){
if (req.user.role == "admin") {
    next() 
} else {
    res.status(401).send({message: "user not admin"})  
}
}
*/
module.exports = {
    validUserId

}
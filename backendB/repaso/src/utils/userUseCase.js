const fs = require('fs')
const path = './src/db/users.json'

async function readFile() {
    return await new Promise ((resolve, reject)=> {
       fs.readFile(path,'utf-8', (error, data)=>{
            if (error) {
                reject (error)  
            }
            else{
                resolve(JSON.parse(data))
            }
        })
    })
}

async function writeFile(data) {
    return await new Promise ((resolve, reject)=> {
       fs.writeFile(path, JSON.stringif(data, null, 4), (error, data)=>{
            if (error) {
                reject (error)  
            }
            else{
                resolve(JSON.parse(data))
            }
        })
    })
}

//
async function createUser (user){
try {
    let users = await readFile()
    users.push(user)
    return await writeFile(users)
} catch ( error) {
    return null
}
}

async function getUser(){
    try {
       let users = await readFile() 
       return users
    } catch ( error) {
        return null
    }
    }
    

async function updateUser (id, user){
    try {
        let users = await readFile ()
      for (let index = 0; index < users.length; index++) {
       if (id == user [i].id) {
        users[i]=user
        break
       }
      }
      return await writeFile(users)

    } catch ( error) {
        return null
    }
    }

    async function deleteUser (id, user){
        try {
            const users = await readFile ()
            let newUser=[]
          for (let index = 0; index < users.length; index++) {
           if (id == user [i].id) {
             newUser.pop(i)
             break
           }
          }
          return await writeFile(users)
    
        } catch ( error) {
            return null
        }
        }
        module.exports={
            createUser,
            getUser,
            updateUser,
            deleteUser
        }
        

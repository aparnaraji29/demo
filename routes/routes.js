const {Router} = require('express')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = Router()

router.post('/register',async(req,res)=>{
   let email = req.body.email
   let password = req.body.password
   let name = req.body.name

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password,salt)
  
   const record = await User.findOne({email:email})
  
   if(record){
    return res.status(400).send({
        message:"Email is already registered"
    });
   }else{
    const user = new User({
        name:name,
        email:email,
        password:hashedPassword
       })
   

   const result = await user.save()

//    JWT token
const {_id} = await result.toJSON()

const token = jwt.sign({_id:_id},"secret")

res.cookie("jwt",token,{
    httpOnly:true,
    maxAge:24*60*60*1000
})

res.send({
    message:"success"
})
   res.json({
    user:result
   })
}
})

router.post('/login',async(req,res)=>{
    res.send("login user")
})

router.get('/user',async(req,res)=>{
    
    try {
        
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie,"secret")

        if(!claims){
            return res.status(401).send({
                message:"unauthenticated"
            })
        }
        else{

        const user = await User.findOne({_id:claims._id})

        const {password,...data} = await user.toJSON()

        res.send(data)
        }

    } catch (err) {
        // return res.status(401).send({
        //     message:"unauthenticated"
        return res.status(401).send({success: false, err 
        })
        
    }
})


router.post('/logout',(req,res)=>{
    res.cookie("jwt","",{maxAge:0})

    res.send({
        message:"success"
    })
})


module.exports = router
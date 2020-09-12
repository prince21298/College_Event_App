var express = require('express');
var router = express.Router();
const Users = require('../Services/users');
const userData= new Users;
const {generateAccessToken,authenticateToken}=require('../Jwt/auth/auth')

router.get('/users',async function(req,res){
  const data = await userData.findAll();
  res.send({data:data})
})

router.post('/sign_up',async function(req,res){
  var data=req.body
  data["user_role"] = 'student'
  await userData.Insert(data).then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send(err)
  })
})


router.post('/login',async function (req,res){
  var data= req.body;
  let emailVerify=await userData.emailVerify(data.email)
  if(emailVerify){
    let passCheck = await userData.passChecking(emailVerify,data.password)
    if (passCheck){
      let genrateToken = generateAccessToken(emailVerify)
      res.cookie("key",genrateToken)
      emailVerify['password']=NaN;  
      res.send({'Data':emailVerify})
    }
    else{
      res.send({'oops!': 'your password is wrong'})
    }
  }else{
    res.send({'oops!': 'your email is wrong'})
  }
})

router.get('/hello',authenticateToken,function (req,res){
  res.send({data:req.decode})
})


router.put('/update_role',authenticateToken,async function(req,res){
  let details = req.decode;
  let data = req.body;
  await userData.updateRole(data,details['username']).then(data=>{
    res.send({
      'data':"make admin sucessfully..   "
    })
  })
})



module.exports = router;

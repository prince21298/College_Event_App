var express = require('express');
var router = express.Router();
const Events = require('../Services/events');
const eventData=new Events;
const {authenticateToken}=require('../Jwt/auth/auth');
var {Role}=require('../../Config/constant')
Role=Role.split(',')

router.get('/final_result',authenticateToken,async function(req,res){
    var details=req.decode;
    let Result=await eventData.findAll(details['username']);
    res.send(Result)
})


router.get('/all_event',async function(req,res){
    let Result=await eventData.findAllEvents()
    res.send(Result)
})
 

router.post('/create_event',authenticateToken,async function(req,res){
    let data = req.body;
    var details=req.decode;
    if (Role.includes(details["username"].user_role)){
        let Result = await eventData.Insert(data,details['username']);
        res.send(Result)
    }else{
        res.send({
            "message":"you can't add event you are not admin"
        })
    }
})

router.put('/update_event',authenticateToken,async function(req,res){
    let data =req.body;
    let details =req.decode;
    if (Role.includes(details["username"].user_role)){
        let Result = await eventData.updateEvent(data);
        if (Result){
            let Result = await eventData.findOne(data.event)
            res.send(Result)
        }
    }else{
        res.send({
            "message":"you can't Update event you are not admin"
        })
    }
})



router.delete('/delete_event',authenticateToken,async function(req,res){
    let data =req.body;
    let details =req.decode;
    if (Role.includes(details["username"].user_role)){
        await eventData.deleteEvent(data).then(data=>{
            if(data){
                res.send({'data':'Delete Event Sucessfully...   '})
            }
        })
    }else{
        res.send({
            "message":"you can't Update event you are not admin"
        })
    }
})








module.exports = router;

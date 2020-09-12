var express = require('express');
var router = express.Router();
const Participant = require('../Services/sponser');
const sponserData=new Participant;
const {authenticateToken}=require('../Jwt/auth/auth');
var {Role}=require('../../Config/constant');
Role=Role.split(',')



router.get('/all_sponsers',authenticateToken,async function(req,res){
    var details = req.decode;
    var sponser_details =await sponserData.FindAllSponsers(details['username'])
    res.send(sponser_details)
})


router.get('/do_sponsering', async function(req,res){
    let data = req.body;
    var sponser_details = await sponserData.addSponsers(data);
    res.send(sponser_details)
})

router.get('/my_sponsered_events',async function(req,res){
    let data = req.body;
    var sponser_details = await sponserData.mySponseredEvents(data);
    res.send(sponser_details)
})


module.exports = router;

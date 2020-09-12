var express = require('express');
var router = express.Router();
const Participant = require('../Services/participant');
const ParticipantData=new Participant;
const {authenticateToken}=require('../Jwt/auth/auth');
var {Role}=require('../../Config/constant');
Role=Role.split(',')


router.get('/all_participant',authenticateToken,async function(req,res){
    var details = req.decode;
    var participant_details =await ParticipantData.findParticipant(details['username'])
    res.send(participant_details)
})


router.post('/add_participant',authenticateToken,async function(req,res){
    var details=req.decode;
    var data= req.body;
    var verify= await ParticipantData.VerifyParticipant(data,details['username'])
    if (verify.length === 0){
        var participant_details =await ParticipantData.joinParticipant(data,details['username']);
        res.send(participant_details)
    }else{
        res.send({
            "error":"you or your team can participate in one event"
        })
    }
})

router.get('/my_participations',authenticateToken,async function(req,res){
    var details = req.decode;
    var participant_details =await ParticipantData.myParticipation(details['username'])
    res.send(participant_details)
})



module.exports = router;

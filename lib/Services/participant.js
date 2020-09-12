var Participant = require('../Model/participant');
var {Role}= require('../../Config/constant')
Role=Role.split(',');


module.exports= class paticipantService {

    async findParticipant(details,txn){
        if (Role.includes(details.user_role)){
            return await Participant.query(txn).select('participant_name','event_name','college','team_name');
        }
    }

    async joinParticipant(data,details,txn){
        data['participant_name']=details.username;
        data['college']=details.college_name;
        data['email']=details.email;
        return await Participant.query(txn).insertGraph(data);
    }

    async myParticipation(details,txn){
        return await Participant.query(txn).select('participant_name','event_name','college','team_name').where({'email':details.email})
    }


    async VerifyParticipant(data,details,txn){
        return await Participant.query(txn).where({
            "college":details.college_name,
            "event_name":data.event_name
        })
    }
}
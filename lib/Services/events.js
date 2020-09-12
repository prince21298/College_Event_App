var Events = require('../Model/events');
// var Sponser = require('../Model/sponser');
var {Role}= require('../../Config/constant')
Role=Role.split(',');


module.exports= class eventService {
    async findAll(details,txn){
        if (Role.includes(details.user_role)){
            let event_details = await Events.query(txn)
            return event_details
        }
        else{
            let event_details = await Events.query(txn).select('event','description','college','winner_team','team_captain',
            'total_score')
            return event_details
        }
    }

    async findAllEvents(details,txn){
        // if (Role.includes(details.user_role)){
        //     let event_details = await Events.query(txn).select('event','description','event_creator','creator_role')
        //     return event_details
        // }else{
        let event_details = await Events.query(txn).select('event','description')
        return event_details;
        // }
    }


    async findOne(data,txn){
        return await Events.query(txn).where({'event':data})
    }


    async Insert(data,details,txn){
        data['event_creator']=details.username;
        data['creator_role']=details.user_role;
        let event_details= await Events.query(txn).insertGraph(data)
        return event_details;
    }

    async updateEvent(data,txn){
        return await Events.query(txn).update(data).where({'event':data.event})
    }

    async deleteEvent(data,txn){
        return await Events.query(txn).delete().where({'event':data.event})
    }
}
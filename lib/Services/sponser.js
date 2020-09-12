var Sponser = require('../Model/sponser');
var {Role}= require('../../Config/constant')
Role=Role.split(',');


module.exports= class sponserService {

    async FindAllSponsers(details,txn){
        if (Role.includes(details.user_role)){
            return await Sponser.query(txn).select('sponser_name','sponser_email','sponser_contact','company_name','sponsering_amount','event');
        }
    }

    async addSponsers(data,txn){
        return await Sponser.query(txn).insertGraph(data)
    }

    async mySponseredEvents(data,txn){
        return await Sponser.query(txn).where({'sponser_email':data.sponser_email})
    }

}
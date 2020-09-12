var User = require('../Model/users');
var bcrypt=require('bcryptjs');
var {HOD} = require('../../Config/constant');
HOD=HOD.split(',')

module.exports= class userService {
    async findAll(txn){
        let user_details = await User.query(txn)
        return user_details
    }
    async Insert(data,txn){
        const pass = await bcrypt.hash(data.password,8)
        data['password']=pass
        if(HOD.includes(data.email)){
            data['user_role']='HOD'
            let user_details= await User.query(txn).insertGraph(data)
            return user_details;
        }
        else{
            let user_details= await User.query(txn).insertGraph(data)
            return user_details;
        }
    }
    async passChecking(emailVerify,data){
        return bcrypt.compare(data,emailVerify.password)
    }

    async emailVerify(data,txn){
       var user_details= await User.query().findOne('email',data)
       return user_details
    }

    async updateRole(data,details,txn){
        if(details.user_role=='HOD'){
            return await User.query().update(data).where({'email':data.email});
        }
    }
}
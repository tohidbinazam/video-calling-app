import mongoose from "mongoose";


const userModel = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    gender : {
        type : String
    },
    photo : {
        type : String,
    },
    isVerified:{
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    status : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : false
    }
},{ timestamps : true })


export default mongoose.model('User', userModel)
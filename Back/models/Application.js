const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    school:{
        type:String,
        required:true
    },
    attending:{
        type:String,
        required:true
    },
    major:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    interests:{        
        type:[Number],
        required:true
    },
    keyword:{
        type:[String],
        reqired:true     
    }
   
})

module.exports = mongoose.model('Application', applicationSchema);


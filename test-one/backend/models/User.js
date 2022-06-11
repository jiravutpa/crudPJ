const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
    brandID:{
        type: String
    },
    modelCode:{
        type: String
    },
    name:{
        type: String
    },
    modelYear:{
        type: String
    },
    fuel:{
        type: String
    }
},{
    collection: 'users'
})

module.exports = mongoose.model('User',usersSchema)
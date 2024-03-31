const mongoose = require('mongoose');

// User:

//     'userID': {type: String},
//     'username': {type: String},
//     'hashedPassword': {type: String},
//     'fullname': {type: String},
//     'role': {type: String}, #student, teacher, admin
//     'email': {type: String},
//     'schedule': {type: JSON_Object}
//     'phoneNo': {type: int}
//     'positionList': array of String; #list of classID, only for students

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    schedule: {
        type: Object,
        required: false
    },
    phoneNo: {
        type: Number,
        required: false
    },
    positionList: {
        type: Array,
        required: false
    }


});
const User = mongoose.model('User', userSchema);
module.exports = User;
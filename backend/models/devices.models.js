// Device:
//  'deviceID': {type: String},
//     'name': {type: String},
//     'type': {type: String},
//     'position': {type: String},
//     'curValue': {type: Integer}

const mongoose = require('mongoose');
const deviceSchema = new mongoose.Schema({

    deviceID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    curValue: {
        type: Number,
        required: true
    }
 });

 const Device = mongoose.model('Device', deviceSchema);
    module.exports = Device;
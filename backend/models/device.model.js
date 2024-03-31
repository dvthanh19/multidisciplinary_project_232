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
        lastValue: {
            type: String, 
            required: false 
        },
        updatedAt: {
            type: Date, 
            required: false 
        }
    }
 });

 const Device = mongoose.model('Device', deviceSchema);
    module.exports = Device;
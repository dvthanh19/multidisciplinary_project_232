// Sensor:
//   'sensorID': {type: String},
//     'name': {type: String},
//     'type': {type: String},
//     'position': {type: String},
//     'curValue': {type: Integer}
const mongoose = require('mongoose');
const sensorSchema = new mongoose.Schema({
    
        sensorID: {
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
    
    const Sensor = mongoose.model('Sensor', sensorSchema);
    module.exports = Sensor;
    
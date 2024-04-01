// import response from "express";
const Devices = require("../models/DevicesModel");
const Sensors = require("../models/SensorsModel");


class HomeController {
    static deviceIdx = 0
    static sensorIdx = 0

    foo = async (req, res, next) => {
        res.send('INDEX_PAGE')
    }

    // [POST]
    createDevices = async (req, res, next) => {
        const { device_type, device_brand, room_id } = req.body;
        try {
            id = (deviceIdx++).toString()
            id += '0'.repeat(6 - id.length)

            const newDevice = await Devices.create({
                device_id: 'DEV' + id,
                device_type,
                device_brand,
                room_id,
            });
            res.status(201).json({ msg: "Device created successfully!" });
        }
        catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }

    // [GET]
    findDeviceInRoom = async (req, res, next) => {
        try {
            const devices = await Devices.findAll({
                where: {
                    room_id: req.query.roomID
                }
            });
            res.status(200).json(devices);
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }

    // [POST]
    updateDevices = async (req, res, next) => {
        try {
            const { device_id, device_type, device_brand, room_id } = req.body;
            const updatedDevice = Devices.update({
                device_type,
                device_brand,
                room_id,
            }, {
                where: {
                    device_id: device_id,
                },
            });
            res.status(200).json({ msg: "Device updated successfully!" });
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }


    // [GET]
    deleteDevices = async(req, res, next) => {
        try {
            const device = await Devices.findOne({
                where: {
                    device_id: req.query.device_id
                }
            })
            if (!device) return res.status(404).json({ msg: "Device not exist" });


            if (req.role === "admin") {
                await Devices.destroy({
                    where: {
                        device_id: req.query.device_id,
                    }
                });
            } else return res.status(403).json({ msg: "Access denied" });

            res.status(200).json({ msg: "Device deleted successfully" });
    
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }




    // [POST]
    createSensors = async (req, res, next) => {
        const { sensor_type, room_id } = req.body;
        try {
            id = (sensorIdx++).toString()
            id += '0'.repeat(6 - id.length)

            const newSensor = await Sensors.create({
                sensor_id: 'SEN' + id,
                sensor_type,
                room_id,
            });
            res.status(201).json({ msg: "Sensor created successfully!" });
        }
        catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }

    // [GET]
    findSensorInRoom = async (req, res, next) => {
        try {
            const sensors = await Sensors.findAll({
                where: {
                    room_id: req.query.roomID
                }
            });
            res.status(200).json(sensors);
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }

    // [POST]
    updateSensors = async (req, res, next) => {
        try {
            const { sensor_id, sensor_type, room_id } = req.body;
            const updatedSensor = Sensors.update({
                sensor_type,
                room_id,
            }, {
                where: {
                    sensor_id: sensor_id,
                },
            });
            res.status(200).json({ msg: "Sensor updated successfully!" });
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }


    // [GET]
    deleteSensors = async(req, res, next) => {
        try {
            const sensor = await Sensors.findOne({
                where: {
                    sensor_id: req.query.sensor_id
                }
            })
            if (!sensor) return res.status(404).json({ msg: "Sensor not exist!" });
            

            if (req.role === "admin") {
                await Sensors.destroy({
                    where: {
                        device_id: req.query.sensor_id
                    }
                });
            } else return res.status(403).json({ msg: "Access denied!" });

            res.status(200).json({ msg: "Sensor deleted successfully!" });
    
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }

}

module.exports = new HomeController();

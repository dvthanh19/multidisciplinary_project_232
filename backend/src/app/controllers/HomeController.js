// import response from "express";
const Devices = require("../models/DevicesModel");


class HomeController {
    static i = 0

    // [POST]
    create = async (req, res, next) => {
        const { deviceName, roomID } = req.body;
        try {
            id = (i++).toString()
            id += '0'.repeat(6 - id.length)

            const newDevice = await Devices.create({
                device_id: 'DEV' + id,
                device_name: deviceName,
                room_id: roomID,
            });
            res.status(201).json({ msg: "Prodcut created successfully" });
        }
        catch (err) {
            res.status(500).json({ msg: error.message });
        }
    }


    // [GET]
    findDeviceInRoom = async (req, res, next) => {
        try {
            const devices = await Devices.findAll({
                where: {
                    room_id: req.params.roomID
                }
            });
            res.status(200).json(devices);
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }

    // [POST]
    update = async (req, res, next) => {
        try {
            const { deviceID, deviceType, roomID } = req.body;
            const updatedDevice = Devices.update({
                device_type: deviceType,
                room_id: roomID,
            }, {
                where: {
                    device_id: deviceID,
                },
            });
            res.status(200).json({ msg: "Product updated successfully" });
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }


    // [GET]
    delete = async(req, res, next) => {
        try {
            const device = await Devices.findOne({
                where: {
                    device_id: req.params.id
                }
            })
            if (!device) return res.status(404).json({ msg: "Product not exist" });
            

            const id = req.body.id; 
            let response;
            if (req.role === "admin") {
                await Devices.destroy({
                    where: {
                        device_id: device_id
                    }
                });
            } else return res.status(403).json({ msg: "Access denied" });

            res.status(200).json({ msg: "Product deleted successfully" });
    
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }

}

module.exports = new HomeController();

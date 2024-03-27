import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const Devices = db.define(
    "devices", {
        device_id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        device_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        room_id: {
            type: DataTypes.STRING,
            type: DataTypes.ENUM,
            values: ['B1-201', 'B1-202', 'B1-203'],
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    }
);
export default Devices;
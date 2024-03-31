import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UsersModel.js";

const { DataTypes } = Sequelize;

const Schedule = db.define(
    "schedule", {
        user_id: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: Users,
                key: 'user_id'
            },
        },
        room_id: {
            primaryKey: true,
            type: DataTypes.ENUM,
            values: ['B1-201', 'B1-202', 'B1-203'],
            allowNull: false,
        },
        time_start: {
            type: DataTypes.TIME,
            allowNull: false
        },
        time_end: {
            type: DataTypes.TIME,
            allowNull: false
        },
        teaching_date: {
            type: DataTypes.ENUM,
            values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    }
);
Users.hasMany(Schedule);
Schedule.belongsTo(Users, { foreignKey: 'user_id' });



module.exports = Schedule;
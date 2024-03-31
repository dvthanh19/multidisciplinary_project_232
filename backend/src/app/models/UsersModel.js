const Sequelize = require("sequelize");
const db = require("../../config/database.js") ;

const { DataTypes } = Sequelize;

const Users = db.define(
    "users", {
        user_id: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        password: {
            type: DataTypes.STRING(64),
            validate: {
                is: /^[0-9a-f]{64}$/i
            }
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'controller', 'observer'],
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            }
        },
        phone_num: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: 10,
            }
        },
    }, {
        freezeTableName: true,
    }
);



module.exports = Users;
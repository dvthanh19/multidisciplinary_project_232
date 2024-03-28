import sequelize, { Sequelize } from "sequelize";
const dbConfig = require("./dbCongig.js")

const db = new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password, 
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
    },
);



db.authenticate().then(() => {
    console.log("Connected...");
}).catch((error) => {
    console.error("Error: ", error);
});

module.export = db;

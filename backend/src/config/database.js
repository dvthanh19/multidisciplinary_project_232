const Sequelize = require("sequelize");
const dbConfig = require("./dbConfig.js")

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





module.exports = db;

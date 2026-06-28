// const { Sequelize } = require("sequelize")

// // const sequelize = new Sequelize{
// //     "postgres://admin:password@example.com/taskManager"
// // }


// const sequelize = new Sequelize("taskManager", "postgres", "admin",
//     {
//         host: "localhost",
//         dialect: "postgres"
//     }
// );

// module.exports = sequelize;




const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
const http = require("http");
const app = require("./app");
const sequelize = require("./DataBase/connect")
const {User, Category, Task} = require("./Model/association")
require("dotenv").config();
require("./Middleware/CronJob")
/**
 * Garanti si le port est un port valide avant de lancer le server
 * @param {*} val 
 * @returns 
 */

const normalizePort  = (val) => {
    const port = parseInt(val, 10);

    if(isNaN(val)){
        return val;
    }

    if(val  >= 0)
    {
        return port;
    }

    return false;
}


const errorHandler = (error) => {
    if(error.syscall !== "listen") {
        throw error;
    }
    const address = server.adress();

    const bind = typeof address === "string" ? "pipe" + address : "port : " + port
    
    switch(error.code) {
        case "EACCES" :
            console.error(bind + "requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    };
};

const port = normalizePort(process.env.PORT || "3000");


const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    const adress = server.address();
    const bind = typeof adress === "string" ? "pipe " + adress : "port " + port;
    console.log("Listening on " + bind);
});




async function connectionToBd() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been establisehd succesfully");

        // await sequelize.sync({alter: true});
        await sequelize.sync();
        console.log("Table creer avec succes")

    }catch (error) {
        console.error("Unable to connect to the database : ", error)
    }
}

connectionToBd();

server.listen(port);
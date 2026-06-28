const express = require("express");
const app = express();

const userRoute = require("./route/UserRoute")
const taskRoute = require("./route/TaskRoute")
const categorieRoute = require("./route/CategorieRoute")
const authRoute = require("./route/AuthRoutes")
const refreshRoute = require("./route/RefreshRoute")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});





app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log("➡️ Request received:");
    console.log(req.method, req.url);
    console.log("Body:", req.body);

    next();
});

app.use("/user", userRoute);
app.use("/task", taskRoute)
app.use("/categorie", categorieRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);


module.exports = app;

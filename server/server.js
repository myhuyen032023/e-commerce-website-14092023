const express = require("express");
require("dotenv").config();
const dbConnect = require('./config/dbConnect');
const initRoutes = require('./routes');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8888; 

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE "],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
dbConnect();
initRoutes(app);



app.listen(port, () => {
    console.log("Server running on the port: "+ port);
})
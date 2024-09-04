// Import Modules
import session from "express-session";
import bodyParser from "body-parser";
import express from "express";
import timon from "timonjs";
import cors from "cors";
import fs from "fs";

// Import Components
import functions from "./components/functions.js";

// Import Constants
import CONFIG from "./config.js";

// Import Routes
import ROUTES___ROOT from "./routes/root.js";



// Constants
const { 
    ENV,
    PORT,
    SESSION_SECRET_KEY
} = CONFIG;



// Setup
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 432000000
    }
}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cors());



// Routes
app.use("/", ROUTES___ROOT);



// Listen
app.listen(PORT, functions.listening);
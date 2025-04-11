// Import Modules
import session from "express-session";
import bodyParser from "body-parser";
import express from "express";
import timon from "timonjs";
import cors from "cors";

// Import Components
import functions from "./components/functions.js";
import origin from "./components/origin.js";
import notAuth from "./components/not.auth.js";
import auth from "./components/auth.js";

// Import Constants
import CONFIG from "./config.js";

// Import Routes
import ROUTES___ROOT from "./routes/root.js";
import ROUTES___API from "./routes/api.js";
import ROUTES___AUTH from "./routes/auth.js";
import ROUTES___ADMIN from "./routes/admin.js";



// Constants
const { 
    ENV,
    PORT,
    HOST,
    SESSION_SECRET_KEY
} = CONFIG;



// Setup
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.json({
    limit: "10gb",
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: "10gb",
    extended: true
}));

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

app.use(origin);



// Routes
app.use("/", ROUTES___ROOT);
app.use("/api", ROUTES___API);
app.use("/auth", notAuth, ROUTES___AUTH);
app.use("/admin", auth, ROUTES___ADMIN);

app.get("*", (req, res) => res.status(404).redirect("/"));
app.post("*", (req, res) => res.status(404).end());



// Listen
app.listen(PORT, HOST, functions.listening);
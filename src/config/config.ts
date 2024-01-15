import { config } from "dotenv";

config();

const DEP_TYPE = process.env.DEPLOYMENT || "local";

// MONGODB DETAILS
const MONGO_STRING = (DEP_TYPE === "production" ? process.env.MONGO_DB_URL_PROD : DEP_TYPE === "development" ? process.env.MONGO_DB_URL_DEV : process.env.MONGO_DB_URL_LOCAL) || "";

// SERVER DETAILS
const SERVER_HOSTNAME = (DEP_TYPE === "production" ? process.env.SERVER_HOSTNAME_PROD : DEP_TYPE === "development" ? process.env.SERVER_HOSTNAME_DEV : process.env.SERVER_HOSTNAME_LOCAL) || "";
const SERVER_PORT = (DEP_TYPE === "production" ? process.env.PORT_PROD : DEP_TYPE === "development" ? process.env.PORT_DEV : process.env.PORT_LOCAL) || "";
// process.env.JWT_SECRET || "sjkjk54sf455s4=sf1554"

const CLIENT_HOSTNAME = (DEP_TYPE === "production" ? process.env.CLIENT_HOSTNAME_PROD : DEP_TYPE === "development" ? process.env.CLIENT_HOSTNAME_DEV : process.env.CLIENT_HOSTNAME_DEV) || "";

const JWT_SECRET = (DEP_TYPE === "production" ? process.env.JWT_SECRET_PROD : DEP_TYPE === "development" ? process.env.JWT_SECRET_DEV : process.env.JWT_SECRET_LOCAL) || "";
const KEY = process.env.ENCRYPTION_KEY || "";
const IV = process.env.ENCRYPTION_IV || "";

//keys details
const KEYS={
    jwt_secret: JWT_SECRET,
    key : KEY,
    iv : IV
}

// MongoDB Details
const MONGO = {
    string : MONGO_STRING
}

// Server Details
const SERVER = {
    hostname : SERVER_HOSTNAME,
    port : SERVER_PORT
}

// Client Details
const CLIENT={
    hostname : CLIENT_HOSTNAME
}


// Final Object
const myconfig = {
    mongo : MONGO,
    server : SERVER,
    keys : KEYS,
    client : CLIENT
}

export default myconfig;
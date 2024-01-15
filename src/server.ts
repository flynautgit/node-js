import express, { Application } from "express";
import config from "./config/config";
import routes from "./routes/main";
import mongoose from "mongoose";
import cors from "cors";



const app:Application = express();

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Backend Live");
})

// Declaring Routes
routes(app);



let server;
mongoose.connect(config.mongo.string)
    .then(() => {
        server = app.listen(config.server.port, () => {
            console.log(`Server running on port: ${config.server.port}`);
        })
    }
    )
    .catch((error) => console.log(`Error :- ${error.message} `));

import jwt from "jsonwebtoken";

import config from "../config/config";
import DeviceDetector from "device-detector-js";
import { Request } from "express";
import { ObjectId } from "mongoose";


class Token{

    getToken(req:Request,id:ObjectId){

         //fetching browser details
         const dt = new DeviceDetector();
         const agent:any = req.headers['user-agent'];
         const browserDetails = dt.parse(agent);
 
         var tokenObj = {
             ...browserDetails,
             id : id
         }

        return jwt.sign({ tokenObj }, config.keys.jwt_secret,{ expiresIn : '30d'} );
    }

}

export default new Token();

import jwt from "jsonwebtoken";
import config from "../config/config";
import DeviceDetector from "device-detector-js";
import { account_status, user_status } from "../types/enum";
import User from "../models/User";
import { NextFunction } from "express";


export const SocketAuth = (socket:any,next:NextFunction)=>{

        const headers = socket.handshake.auth;

        try{
            if(headers.token){
       
                if(headers.token.startsWith('Bearer'))
                var token = headers.token.split(' ')[1];
                else
                var token = headers.token

                const decod:any = jwt.verify(token, config.keys.jwt_secret);
                const decoded:any = decod['tokenObj'];

                const dt = new DeviceDetector();
                const browserDetails = dt.parse(socket.handshake.headers['user-agent']);

                if(!decoded){
                    next(new Error("Authentication failed"));
                    return;
                }

                if(JSON.stringify(decoded.client ) !== JSON.stringify(browserDetails.client) ){
                    next(new Error("Authentication failed"));
                    return;
                }
                if(JSON.stringify(decoded.os ) !== JSON.stringify(browserDetails.os) ){
                    next(new Error("Authentication failed"));
                    return;
                }
                if(JSON.stringify(decoded.device ) !== JSON.stringify(browserDetails.device) ){
                    next(new Error("Authentication failed"));
                    return;
                }

                (async()=>{

                    const usr:any = await User.findOne({ _id:decoded.id });

                    if( !usr ){

                        next(new Error("Authentication failed"));
                    }

                    if(usr.account_status != account_status.active ){

                        next(new Error("Not allowed"));
                    }

                    if(usr.user_status != user_status.active ){

                        next(new Error("Not allowed"));
                    }

                    socket.user = usr;
                    next()

                })();

           
        }
        else{
            next(new Error("Authentication failed"));
            return;
        }

        }
        catch(e){
            next(new Error("Authentication failed"));
            return;
        }

}
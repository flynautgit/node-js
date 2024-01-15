import jwt from "jsonwebtoken";
import config from "../config/config";
import DeviceDetector from "device-detector-js";
import { account_status, user_status, user_type } from "../types/enum";
import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import responseType from "../types/response";

export default (req:Request, res:Response,next:NextFunction)=>{

        if(req.headers.authorization){
            try{

                if(req.headers.authorization.startsWith('Bearer'))
                var token:string = req.headers.authorization.split(' ')[1];
                else
                var token:string = req.headers.authorization

                const decod:any = jwt.verify(token, config.keys.jwt_secret);
                const decoded:any = decod['tokenObj'];

                const dt = new DeviceDetector();
                const agent:any = req.headers['user-agent'];
                const browserDetails = dt.parse(agent);

                if(!decoded){

                    return res
                    .status(responseType.UNAUTHORIZED)
                    .json({
                        type:1,
                        message:"Un-Authorized",
                        data:null
                    })
                   
                }
                if(JSON.stringify(decoded.client ) !== JSON.stringify(browserDetails.client) ){
                     return res
                    .status(responseType.UNAUTHORIZED)
                    .json({
                        type:2,
                        message:"Un-Authorized",
                        data:null
                    })
                }
                if(JSON.stringify(decoded.os ) !== JSON.stringify(browserDetails.os) ){
                    return res
                    .status(responseType.UNAUTHORIZED)
                    .json({
                        type:3,
                        message:"Un-Authorized",
                        data:null
                    })
                }
                if(JSON.stringify(decoded.device ) !== JSON.stringify(browserDetails.device) ){
                    return res
                    .status(responseType.UNAUTHORIZED)
                    .json({
                        type:4,
                        message:"Un-Authorized",
                        data:null
                    })
                }

                (async()=>{

                    const usr:any = await User.findOne({ _id:decoded.id });

                    if( !usr ){

                        return res
                        .status(responseType.UNAUTHORIZED)
                        .json({
                            type:5,
                            message:"Un-Authorized",
                            data:null
                        })
                    }

                    if(usr.role != user_type.admin ){

                        return res
                        .status(responseType.FORBIDDEN)
                        .json({
                            type:0,
                            message:"Not an Admin!",
                            data:null
                        })
                    }

                    if(usr.account_status != account_status.active ){

                        return res
                        .status(responseType.FORBIDDEN)
                        .json({
                            type:1,
                            message:"Account Access revoked by Admin!",
                            data:null
                        })
                    }

                    if(usr.last_device != JSON.stringify(browserDetails)){

                        return res
                        .status(responseType.FORBIDDEN)
                        .json({
                            type:2,
                            message:"Not Logged In",
                            data:null
                        })
                    }

                    req.user = usr;
                    next()

                })();

            }catch(error){
                return res
                .status(responseType.INTERNAL_SERVER_ERROR)
                .json({
                    type:0,
                    message:"Some Error occured while de-tokenization",
                    data:null
                })
            }
        }
        else{
            
            return res
                    .status(responseType.UNAUTHORIZED)
                    .json({
                        type:0,
                        message:"Un-Authorized",
                        data:null
                    })
        }

}
import { Request, Response } from "express";
import { getAllUsers } from "../services/user";

class UserController{

    async getAllUsers(req:Request,res:Response){

        // All the business Logics over here
        const allUser = await getAllUsers();

        console.log(allUser)

        res.json({
            type:0,
            message:"Successful",
            data:allUser
        })

    }
}

export default new UserController();
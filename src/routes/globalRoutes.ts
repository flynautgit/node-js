import express, { Router } from "express";
import UserController from "../controllers/UserController";

const globalRoute:Router = express.Router();


globalRoute.route('/')
.get( UserController.getAllUsers )  // Controller over here


export default globalRoute;
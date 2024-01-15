import express, { Router } from "express";
import isAdmin from "../middlewares/isAdmin";

const adminRoute:Router = express.Router();


adminRoute.route('/')
.get( isAdmin, ) // All the middlewares and Controller here.


export default adminRoute;
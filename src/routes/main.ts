import express, { Application } from "express";
import adminRoute from "./adminRoute";
import globalRoute from "./globalRoutes";

const routes = (app:Application) => {

    app.use( '/api/v1',[
        express.urlencoded({ extended: true, limit:"1mb" }),
        express.json({ limit:"200mb" })],
        globalRoute)

    app.use('/api/v1/admin',[
        express.urlencoded({ extended: true, limit:"1mb" }),
        express.json({ limit:"200mb" })],
        adminRoute)

}

export default routes;
import soc from "socket.io";
import { SocketAuth } from "../middlewares/socketAuth";
const socket = soc.Server;

let io:any = null;

class Socket{

    private server:any;

    setServer(server:any){
        this.server = server;
    }

    createConnection(){
        io = new socket(this.server);
        io.use(SocketAuth);

        io.on("connection", (socket:any) => {
        
            socket.join(socket.user.id); // joining room


            socket.on("disconnect", (reason:any) => {
                // ...
             
              });
        });

    }

    getIo(){
        return io;
    }
}

module.exports.socket = new Socket();
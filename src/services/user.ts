import User from "../models/User"

const getAllUsers= ()=>{
    return new Promise((resolve,reject)=>{

        (async()=>{
            const usr = await User.find({});
            resolve(usr ? usr : null);
        })();
        
    })
}


export {
    getAllUsers
};
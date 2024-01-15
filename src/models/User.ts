import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: { type: Number, required: [true, "Please add User - Type"] },
    name: { type: String, trim: true, },
    email: { type: String, trim: true, },
    account_status: { type: Number },
    user_status:{ type: Number},
    gender: { type: Number },
    password: { type: String, required: [true, "Please add password"] },
    pic: { type: String, trim: true },
    account_type:{type:Array,default:[]},
    lastActive:{type:Date, default: () => Date.now() }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;
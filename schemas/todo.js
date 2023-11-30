import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
});
export const todoModel = mongoose.model("todo",todoSchema)
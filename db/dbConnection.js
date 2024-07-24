import mongoose from "mongoose";

export const dbConnection = mongoose.connect(`mongodb://127.0.0.1:27017/libraryApp`).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("failed",err);
})
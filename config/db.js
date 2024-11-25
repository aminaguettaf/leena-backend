import mongoose from "mongoose";

export const dbConnection = async()=>{
    await mongoose.connect('mongodb+srv://miinouush:aminachamina404@cluster0.6cbd5.mongodb.net/leenacollection')
    .then(()=>{
        console.log('db connected')
    })
}
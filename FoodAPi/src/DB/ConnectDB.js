import mongoose from "mongoose";

const ConnectDB = async()=>{
    const connection = await mongoose.connect(
        "mongodb://localhost:27017/FoodDB"
    );
    console.log(connection.connection.name);
}

export {ConnectDB}
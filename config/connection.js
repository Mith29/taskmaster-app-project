import 'dotenv/config'
import mongoose from 'mongoose'
function connectDB(){
//connection string to connect to mongoDB
const connectionString = process.env.MONGO_URI;

//connect to mongoDB using mongoose
mongoose
  .connect(connectionString)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((err) => console.error("Connection error", err));
  }

export default connectDB;
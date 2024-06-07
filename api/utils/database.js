import mongoose from "mongoose";
import appConstants from "../constants/index.js";


  const DATABASEURL = appConstants.DATABASEURL;

  const connectDb = async () => {
    
    if(!DATABASEURL) {
        throw new Error("No database url");
    }
    
    const connectionState = mongoose.connection.readyState;
      if(connectionState === 1) {
          console.log("Already connected");
          return;
      }
  
      if(connectionState === 2) {
          console.log("Connecting...");
          return;
      }
  
      try {
          mongoose.connect(DATABASEURL, {
              bufferCommands: true
          });
          console.log("Connected!");
      } catch (error) {
          throw new Error("Error: ", error);
      }
  }


  export default connectDb;
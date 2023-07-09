import mongoose from "mongoose";

export default function dbConnect() {
  try {
    mongoose.connect(process.env.MongoDb_Uri!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("database connected successfully");
    });

    connection.on("error", (err) => {
      console.log("database connected failed " + err);
      process.exit(1);
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

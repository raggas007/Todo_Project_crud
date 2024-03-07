import mongoose from "mongoose";

const dbName = "TODO";
const dbUserName = "sagar070";
const dbPassword = "ragas12345";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.j5sohkx.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("database connection established...");
  } catch (error) {
    console.log(error.message);
    console.log("database failed to connect");
  }
};

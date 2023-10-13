import mongoose from "mongoose";
import "dotenv/config";

const DATABASE_URL = process.env.MONGODB_CONNECT_URI || "";

(async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connect succesfully");
  } catch (err) {
    console.log(err);
  }
})();

export default mongoose;

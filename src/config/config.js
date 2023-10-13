import mongoose from "mongoose";
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL || "";

(async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connect succesfully");
  } catch (err) {
    console.log(err);
  }
})();

export default mongoose;

import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import tipRecordModel from "./routes/tip-record";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// rSjVvX1BuQzkTJUZ

const mongoURI: string =
  "mongodb+srv://devenschmidt25:rSjVvX1BuQzkTJUZ@cluster0.tuej83q.mongodb.net/";

  mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

  app.use("/tip-record", tipRecordModel)

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
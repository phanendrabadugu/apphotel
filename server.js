import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import roomsRoute from "./routes/roomsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log("DB Connected....."));

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!"
    return res.status(errorStatus).json({
        sucess:false,
        status:errorStatus,
        message:errorMessage,
        stack:error.stack
    })
});

app.listen("8800", () => console.log("Server Connected....."));

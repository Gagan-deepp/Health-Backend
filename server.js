import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/database.js";
import { errorHandler } from "./middleware/ErrorHandle.js";
import { appointMentRouter } from "./router/appointRouter.js";
import { docRouter } from "./router/doctorRouter.js";
import { userRouter } from "./router/userRouter.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded())
app.use(express.json());



//Router
app.use("/api/v1/doctor", docRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/appointment", appointMentRouter)

app.use(errorHandler)



// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running on port ${PORT}`);
});

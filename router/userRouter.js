import { Router } from "express";
import { createUser, deleteUser, getUserById, updateUser } from "../controllers/userController.js";

export const userRouter = Router()

userRouter.post("/create", createUser)
userRouter.get("/:id", getUserById)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
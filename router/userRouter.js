import { Router } from "express";
import { createUser, deleteUser, getUserById, getUserByMail, searchUser, updateUser } from "../controllers/userController.js";

export const userRouter = Router()

userRouter.post("/create", createUser)
userRouter.put("/:id", updateUser)
userRouter.get("/", searchUser)
userRouter.get("/mail/:mail", getUserByMail)
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUser)
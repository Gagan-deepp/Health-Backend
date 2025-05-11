import { Router } from "express";
import { addFavourite, createUser, deleteUser, getUserById, getUserByMail, removeFavourite, searchUser, updateUser } from "../controllers/userController.js";

export const userRouter = Router()

userRouter.post("/create", createUser)
userRouter.put("/:id", updateUser)
userRouter.get("/", searchUser)
userRouter.get("/mail/:mail", getUserByMail)
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUser)


// User Favourite router
userRouter.post("/favourite/:id", addFavourite)
userRouter.delete("/favourite/:id", removeFavourite)
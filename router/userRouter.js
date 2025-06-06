import { Router } from "express";
import { addFavourite, createUser, deleteUser, getUserAppointment, getUserById, getUserByMail, removeFavourite, searchUser, updateUser } from "../controllers/userController.js";

export const userRouter = Router()

userRouter.post("/create", createUser)
userRouter.put("/:id", updateUser)
userRouter.get("/", searchUser)
userRouter.get("/:id", getUserById)
userRouter.get("/mail/:mail", getUserByMail)
userRouter.delete("/:id", deleteUser)
userRouter.get("/getAppointment/:id", getUserAppointment)


// User Favourite router
userRouter.post("/favourite/:id", addFavourite)
userRouter.delete("/favourite/:id", removeFavourite)
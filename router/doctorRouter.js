import { Router } from "express";
import { createDoctor, getDoctorById, deleteDoctor, updateDoctor, searchDoctor, getDoctorByMail } from "../controllers/doctorController.js";

export const docRouter = Router()

docRouter.post("/create", createDoctor)
docRouter.put("/:id", updateDoctor)
docRouter.get("/", searchDoctor)
docRouter.get("/mail", getDoctorByMail)
docRouter.get("/:id", getDoctorById)
docRouter.delete("/:id", deleteDoctor)
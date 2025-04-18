import { Router } from "express";
import { createDoctor, getDoctorById, deleteDoctor, updateDoctor, searchDoctor } from "../controllers/doctorController.js";

export const docRouter = Router()

docRouter.post("/create", createDoctor)
docRouter.put("/:id", updateDoctor)
docRouter.get("/", searchDoctor)
docRouter.get("/:id", getDoctorById)
docRouter.delete("/:id", deleteDoctor)
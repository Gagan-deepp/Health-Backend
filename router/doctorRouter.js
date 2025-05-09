import { Router } from "express";
import { createDoctor, getDoctorById, deleteDoctor, updateDoctor, searchDoctor, getDoctorByMail } from "../controllers/doctorController.js";
import { addReview, deleteReview } from "../controllers/reviewController.js";

export const docRouter = Router()

docRouter.post("/create", createDoctor)
docRouter.put("/:id", updateDoctor)
docRouter.get("/", searchDoctor)
docRouter.get("/:id", getDoctorById)
docRouter.get("/mail/:mail", getDoctorByMail)
docRouter.delete("/:id", deleteDoctor)


// Doctor review router
docRouter.post("/review/:id", addReview)
docRouter.delete("/review/:id", deleteReview)
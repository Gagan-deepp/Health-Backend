import { Router } from "express";
import { createAppointMent, deleteAppointMent, getAppointmentByID, updateAppointment } from "../controllers/appointmentController.js";

export const appointMentRouter = Router()

// Get specific appointment
appointMentRouter.get("/:id", getAppointmentByID)
appointMentRouter.post("/create", createAppointMent) // Create an appointment
appointMentRouter.delete("/:id", deleteAppointMent) // Delete an appointment
appointMentRouter.put("/:id", updateAppointment) // Update an appointment
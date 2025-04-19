import mongoose from "mongoose";

const appointMentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    appointmentDateTime: {
        type: Date,
        required: [true, "Appointment Date and time required"]
    }
}, { timestamps: true })

export const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointMentSchema)
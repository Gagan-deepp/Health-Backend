import { Appointment } from "../models/Appointment.js"
import { Doctor } from "../models/Doctor.js"

export const createAppointMent = async (req, res) => {
    console.debug("Creating appointment ==> ", req.body)
    try {
        const { doctor, patient, appointmentDateTime } = req.body
        console.debug("Sending Axios Request")
        const appointMent = await new Appointment({ doctor, patient, appointmentDateTime }).save()

        console.debug("Appointment created successfully ==> ", appointMent)

        await Doctor.findByIdAndUpdate(doctor, { $push: { appointment: appointMent._id } }, { new: true })
        console.debug("Added appointment to doctor")

        res.status(201).send({
            message: `Appointment created successfully`,
            data: appointMent,
            success: "success"
        })

    } catch (error) {
        console.error("Error while creating appointment => ", error)
        return res.status(500).send({
            message: "Failed to created appointment",
            success: "fail"
        })
    }
}

export const getAppointmentByID = async (req, res) => {
    console.debug("Searching Appointment ==> ", req.params)
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id).populate('doctor', 'name email phone photoUrl').populate('patient', 'name email phone')
        if (!appointment) {
            console.error("No appointment found with ID ==> ", id)
            return res.status(400).send({
                message: `Appointment not found !! Incorrect ID`,
                success: "fail"
            })
        }

        return res.status(201).send({
            message: `Appointment found !! `,
            data: appointment,
            success: "success"
        })

    } catch (error) {
        console.error("Error while Getting appointment => ", error)
        return res.status(500).send({
            message: "Failed to created appointment",
            success: "fail"
        })
    }
}

export const updateAppointment = async (req, res) => {
    console.debug("Request ID to update ==> ", req.params)
    try {
        const { id } = req.params
        const { doctor, patient, appointmentDateTime, status } = req.body

        console.debug("Updating appointment with details ==> ", req.body)

        const isExistAppoint = await Appointment.findById(id);

        console.debug("Appointment found ==> ", isExistAppoint)

        if (!isExistAppoint) {
            return res.status(400).send({
                message: "Appointment not found",
                success: false
            })
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { doctor, patient, appointmentDateTime, status }, { new: true })

        console.debug("Updated Appointment ==> ", updatedAppointment)
        return res.status(201).send({
            message: `Appointment updated successfully`,
            data: updatedAppointment,
            success: "success"
        })
    } catch (error) {
        console.error("Error while Updating appointment => ", error)
        return res.status(500).send({
            message: "Failed to update appointment",
            success: false
        })
    }
}
export const deleteAppointMent = async (req, res) => {
    console.debug("Request ID to delete ==> ", req.params)
    try {
        const { id } = req.params

        console.debug("Deleting appointment id ==> ", id)

        const deletedAppointment = await Appointment.findByIdAndDelete(id)
        console.debug("Deleted Appointment ==> ", deletedAppointment)

        if (!deletedAppointment) {
            return res.status(401).send({
                success: false,
                message: "Appointment not found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Appointment deleted successfully",
            data: deletedAppointment
        })

    } catch (error) {
        console.error("Error while deleting appointment => ", error)
        return res.status(500).send({
            message: "Failed to delete appointment",
            success: false
        })
    }
}
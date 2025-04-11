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
    console.debug("Searching Appointment ==> ", req.body)
    try {
        const { id } = req.body
        const appointment = await Appointment.findById(id)
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
    try {

    } catch (error) {
        console.debug("Error while Updating appointment => ", error)
    }
}
export const deleteAppointMent = async (req, res) => {
    try {

    } catch (error) {
        console.debug("Error while deleting appointment => ", error)
    }
}
import { Doctor } from "../models/Doctor.js";

export const createDoctor = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const existingDoctor = await Doctor.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingDoctor) {
            return res.status(409).send({
                success: false,
                message: "Doctor already exists with this email or phone"
            });
        }

        const doctor = await Doctor.create({ name, email, phone, role: "doctor" });

        return res.status(201).send({
            success: true,
            message: "Doctor created successfully",
            data: doctor
        });

    } catch (error) {
        console.error("Error while creating doctor ==> ", error)
        return res.status(501).send({
            success: false,
            message: error.message
        })
    }
}

export const getDoctorById = async (req, res) => {
    try {

        const { id } = req.params
        console.debug("Id for request user ==> ", id)

        const doctor = await Doctor.findById(id)

        console.debug(`Doctor for id : ${id} ==> `, doctor)

        if (!doctor) {
            return res.status(409).send({
                success: false,
                message: "Doctor not Found"
            })
        }

        return res.status(201).send({
            success: true,
            data: doctor
        })

    } catch (error) {
        console.error("Error while getting doctor ==> ", error)
        return res.status(501).send({
            success: false,
            message: error.message
        })
    }
}

export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params
        console.debug("Id for deleting doctor ==> ", id)

        const doctor = await Doctor.findByIdAndDelete(id).select("name");

        console.debug("Deleteing doctor ==> ", doctor)

        if (!doctor) {
            return res.status(409).send({
                success: false,
                message: "Doctor not Found, Check the id"
            })
        }

        return res.status(201).send({
            success: true,
            message: "Doctor deleted successfully",
            data: doctor
        })

    } catch (error) {
        console.error("Error while deleting doctor ==> ", error)
        return res.status(501).send({
            success: false,
            message: error.message
        })
    }
}

export const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params
        console.debug("Id for updating doctor ==> ", id)

        const { name, email, phone } = req.body

        if (!name || !email || !phone) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields"
            })
        }

        const doctor = await Doctor.findByIdAndUpdate(id, { name, email, phone }, { new: true })

        console.debug("Updated doctor ==> ", doctor)

        return res.status(201).send({
            success: true,
            message: "Doctor updated successfully",
            data: doctor
        })

    } catch (error) {
        console.error("Error while updating doctor ==> ", error)
        return res.status(501).send({
            success: false,
            message: error.message
        })
    }
}   
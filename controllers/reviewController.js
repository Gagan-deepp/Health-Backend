import { Doctor } from "../models/Doctor.js"

export const addReview = async (req, res, next) => {
    try {
        const { id } = req.params
        console.debug("Adding review for doctor ==> ", id)

        const { user, rating, content } = req.body
        console.debug("Request body for review ==> ", req.body)

        const doctor = await Doctor.findById(id)
        console.debug("Doctor found for review ==> ", doctor)

        if (!doctor) {
            return res.status(404).send({
                success: false,
                message: "Doctor not found"
            })
        }

        doctor.review.push({ user, rating, content })
        await doctor.save();
        console.debug("Review added successfully")

        await doctor.calculateAvgRating()
        console.debug("Average rating calculated successfully")

        console.debug("Doctor after adding review ==> ", doctor)
        return res.status(201).send({
            success: true,
            message: "Review added successfully",
            data: {
                doctorId: doctor._id,
                doctor_name: doctor.name,
                avg_Rating: doctor.avg_Rating,
                review: doctor.review[doctor.review.length - 1]
            }
        })
    } catch (error) {
        console.error("Error while adding review ==> ", error)
        next(error)
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params
        console.debug("Deleting review for doctor ==> ", id)

        const { reviewId } = req.body
        console.debug("Request body for review ==> ", req.body)

        const doctor = await Doctor.findById(id)
        console.debug("Doctor found for review ==> ", doctor)

        if (!doctor) {
            return res.status(404).send({
                success: false,
                message: "Doctor not found"
            })
        }

        const review = doctor.review.id(reviewId)
        if (!review) {
            return res.status(404).send({
                success: false,
                message: "Review not found"
            })
        }

        doctor.review.pull(reviewId);
        await doctor.save()
        console.debug("Review deleted successfully")

        await doctor.calculateAvgRating()
        console.debug("Average rating calculated successfully")

        return res.status(200).send({
            success: true,
            message: "Review deleted successfully",
            review
        })
    } catch (error) {
        console.error("Error while deleting review ==> ", error)
        next(error)
    }
}



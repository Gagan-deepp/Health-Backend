import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            autoIndex: false,
        })
        console.log("Connected to Database")
    } catch (error) {
        console.log("Error while connecting to database ==> ", error)
    }
}
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    content: { type: String, trim: true }
}, { _id: true });

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, "Phone no is required"],
        unique: true,
    },
    photoUrl: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        lowercase: true,
        trim: true,
        default: 'doctor',
    },
    review: [reviewSchema],
    avg_Rating: {
        type: Number,
        default: 0
    },
    appointment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
});

doctorSchema.methods.calculateAvgRating = function () {
    if (this.review.length === 0) {
        this.avg_Rating = 0;
    } else {
        const total = this.review.reduce((sum, r) => sum + r.rating, 0);
        this.avg_Rating = total / this.review.length;
    }
    return this.save();
}

doctorSchema.index({ name: 'text', email: 'text' });

export const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

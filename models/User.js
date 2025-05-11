import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, "Phone no is required"],
        unique: true,
        trim: true,
    },
    favourite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
    role: {
        type: String,
        lowercase: true,
        trim: true,
        default: 'patient',
    },
    photoUrl: {
        type: String,
        trim: true,
    },
});

userSchema.index({ name: 'text', email: 'text' });

export const User = mongoose.models.User || mongoose.model("User", userSchema);

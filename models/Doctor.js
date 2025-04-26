import mongoose from "mongoose";

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
        enum: {
            values: ['patient', 'doctor'],
            message: '{VALUE} is not a valid role here',
        },
        default: 'doctor',
    },
    review: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: [1, 'Minimum rating is 1'],
            max: [5, 'Maximum rating is 1'],
        },
        content: {
            type: String,
            trim: true
        }
    }],
    appointment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
});

doctorSchema.index({ name: 'text', email: 'text' });

export const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

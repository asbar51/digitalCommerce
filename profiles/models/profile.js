import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: { type: String, enum: ['student', 'instructor'], default: 'student' },
    profilePicture: {type: String, default:"img"},
    addToCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    createdAt: {
        type: Date,
        default: new Date
    }
})

const profiles = mongoose.model("profiles", profileSchema)

export default profiles
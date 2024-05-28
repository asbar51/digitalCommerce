import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // instructor: { type: mongoose.Schema.Types.ObjectId, required: true },
    instructor: { type: String, ref: 'profiles', required: true },
    profilePicture: {type: String, default:"img"},
    // students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    price: { type: Number,default:0, required: true },
    stock: { type: Number,default:0, required: true },
    public: { type: String,default: "public", required: true },
    thumbnail: { type: String, required: true }, // URL for the course thumbnail image
    categorie: { type: String }, // Array of categories the course belongs to
    ratings: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        ratingMessage: { type: String, required: true },
        reviewerUsername: { type: String, required: true },
        reviewerPicture: { type: String, required: true },
    }],
    duration: { type: Number, default: 0 }, // Duration of the course in minutes
    createdAt: {
        type: Date,
        default: new Date
    }
    // Additional course-related fields can be added as needed
})

const postMessages = mongoose.model("postMessage", postSchema)

export default postMessages
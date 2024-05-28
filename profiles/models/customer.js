import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
    createdAt: {
        type: Date,
        default: new Date
    }
})

const customers = mongoose.model("customers", customerSchema)

export default customers
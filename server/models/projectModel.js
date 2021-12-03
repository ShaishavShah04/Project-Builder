import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    createdBy: {
        type: { _id: String, name: String},
        required: true,
    },
    createdAt:  { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    description: {
        type: String,
        required: false,
    },
    tech: {
        type: [String],
        required: true,
    },
    comments: {
        type: [{
            name: String,
            comment: String
        }],
        default: [],
    }
})

export const Project = mongoose.model("Project", ProjectSchema);
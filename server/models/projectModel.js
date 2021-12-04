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
        default: Date.now,
        required: true,  
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
    },
    likes: {
        type: Number,
        default: 0,
        required: true, 
    }
})

export const Project = mongoose.model("Project", ProjectSchema);
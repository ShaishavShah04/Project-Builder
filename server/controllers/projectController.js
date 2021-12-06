import { Project } from "../models/projectModel.js";
import mongoose from "mongoose"; // This is no error, mongoose is a CommonJS module
const { Types } = mongoose;

export const post_createProject_handler = async (req, res) => {

    try {
        // Destructure out info
        const { title, subtitle, description, tech } = req.body;
        const name = req.user.firstName + " " + req.user.lastName;

        // Check Info
        if (!title || !description || !name || !subtitle ) {
            return res.status(400).json({ msg: "Not all fields are valid!" });
        }

        // Create Post
        const newProject = new Project({
            title,
            subtitle,
            createdBy: { 
                _id: req.user._id,
                name
            },
            description,
            tech
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);

    } catch (error) {
        res.status(500).json({ err: error.message });
    } 

};

export const get_allProjects_handler = async (req, res) => {
    try {
        const all_projects = await Project.find({}, {"title": 1, "tech": 1, "subtitle": 1, "createdBy.name": 1, "likes": 1});
        res.json({all_projects})
    } catch (error) {
        res.status(500).json({ err: error.message });
    } 
}

export const get_certainProject_handler = async (req, res) => {
    try {
        res.json(req.project);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
}

export const post_comment_handler = async ( req, res) => {
    
    try {
        // Get info
        const comment = req.body.comment;
        const name = req.user.firstName + " " + req.user.lastName;
        if (!name || !comment ) {
            return res.status(400).json({ msg: "Not all fields are valid!" });
        }

        // Add comment
        const projectToUpdate = req.project;
        projectToUpdate.updateOne({ $push: { "comments": { name, comment} }}, { upsert: false }, (error,doc)=>{
                if (error) {
                    res.status(500).json({ err: error.message });
                } else {
                    res.json({ msg: "Added comment! "});
                }
            })

    } catch (error) {
        res.status(500).json({ err: error.message });
    }
}

export const post_like_handler = async (req, res) => {
    try {
        const projectToUpdate = req.project;
        projectToUpdate.updateOne({ $inc: { "likes": 1 }}, { upsert: false }, (error,doc)=>{
                if (error) {
                    res.status(500).json({ err: error.message });
                } else {
                    res.json({ msg: "Added Like! "});
                }
        })
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
}

export const project_id_middleware = async (req, res, next, project_id) => {
    let id = null
    // Checking if possible to convert to obj_id
    try {
        id = Types.ObjectId(project_id);
    } catch (error) {
        return res.status(400).json({ msg: "Not valid project id" });
    }
    // Try to find project from DB
    const response = await Project.findById(id);
    if (!response) {
        return res.status(400).json({ msg: "Not valid project id" });
    } else {
        req.project = response;
        return next();
    }
}
import { Router } from "express";
import { verify } from "../controllers/authHelpers.js";
import { Project } from "../models/projectModel.js";

const projectRouter = Router();

projectRouter.post("/create", verify, async (req, res) => {

    try {

        // Destructure out info
        const { title, description, tech } = req.body;
        const name = req.user.firstName + " " + req.user.lastName;

        // Check Info
        if (!title || !description || !name ) {
            return res.status(400).json({ msg: "Not all fields are valid!" });
        }

        // Create Post
        const newProject = new Project({
            title,
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

});


export default projectRouter;
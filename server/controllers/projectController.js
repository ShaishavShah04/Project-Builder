import { Project } from "../models/projectModel.js";

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
        const all_projects = await Project.find({}, {"title": 1, "tech": 1, "subtitle": 1, "createdBy.name": 1});
        res.json(all_projects)
    } catch (error) {
        res.status(500).json({ err: error.message });
    } 
}

export const get_certainProject_handler = async (req, res) => {
    try {
        const project_id = req.params.project_id;
        // Check if id was provided
        if (!project_id) {
            return res.status(400).json({ msg: "Not all fields are valid!" });
        }
        // Fetch project
        const requestedProject = await Project.findById(project_id);
        if (requestedProject) {
            res.json(requestedProject);
        } else {
            return res.status(400).json({ msg: "Not valid project id" });
        }
    } catch (error) {
        res.status(500).json({ err: error.message });
    }

}
import { Router } from "express";
import { verify } from "../controllers/authHelpers.js";
import { post_createProject_handler, get_allProjects_handler, get_certainProject_handler } from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.get("/all", get_allProjects_handler );

projectRouter.post("/create", verify, post_createProject_handler );

projectRouter.get("/:project_id", get_certainProject_handler );


export default projectRouter;
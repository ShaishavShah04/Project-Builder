import { Router } from "express";
import { verify } from "../controllers/authHelpers.js";
import { post_createProject_handler, get_allProjects_handler, get_certainProject_handler, post_comment_handler, post_like_handler } from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.get("/all", get_allProjects_handler );

projectRouter.post("/create", verify, post_createProject_handler );

projectRouter.post("/commentOn/:project_id", verify, post_comment_handler );

projectRouter.post("/like/:project_id", verify, post_like_handler ); 

projectRouter.get("/:project_id", get_certainProject_handler );


export default projectRouter;
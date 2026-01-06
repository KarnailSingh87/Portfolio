import express from "express";
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// public read routes
router.get("/list", listProjects);
router.get("/:id", getProject);

// admin write routes
router.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createProject
);
router.put(
  "/:id",
  adminAuth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProject
);
router.delete("/:id", adminAuth, deleteProject);

export default router;

import express from "express";
import { getContent, upsertContent } from "../controllers/contentController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/:key", getContent);
router.put("/:key", adminAuth, upsertContent);

export default router;

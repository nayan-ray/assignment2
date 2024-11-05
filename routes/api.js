import express from "express";
import * as blogController from "../app/controllers/blogController.js";
const router = express.Router();


router.post("/create-blog", blogController.createBlog)
router.get("/read-blog", blogController.readBlog)
router.put("/update-blog", blogController.updateBlog)
router.delete("/delete-blog", blogController.deleteBlog)

export default router;
import express from 'express';
import { getPosts, createPost, updatePost, deletePost, getSinglePost } from '../controllers/postController.js';

const router = express.Router();

router.post("/", createPost)

router.get("/", getPosts)

router.get("/:id", getSinglePost)

router.delete("/:id", deletePost)

router.put("/:id", updatePost)

export default router;
import express from "express";
import { Post } from "../Models/Post.mjs";

const router = express.Router();

// Get All Posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create New Post
router.post("/", async (req, res) => {
    const { title, category, content, imageLink, author, uid, date } = req.body;

    const newPost = new Post({
        title,
        category,
        content,
        imageLink,
        author,
        uid,
        date,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Post
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { uid } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        if (post.uid !== uid) {
            return res
                .status(403)
                .json({ message: "Unauthorized To Delete This Post" });
        }

        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add Comment
router.post("/:id/comment", async (req, res) => {
    const { id } = req.params;
    const { uid, username, content } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        const newComment = {
            uid,
            username,
            content,
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        };

        post.comments.push(newComment);
        await post.save();

        const updatedPost = await Post.findById(id);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Toggle Like
router.put("/:id/like", async (req, res) => {
    const { id } = req.params;
    const { uid } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        if (post.likes.includes(uid)) {
            post.likes = post.likes.filter((userId) => userId !== uid);
        } else {
            post.likes.push(uid);
        }

        await post.save();
        const updatedPost = await Post.findById(id);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

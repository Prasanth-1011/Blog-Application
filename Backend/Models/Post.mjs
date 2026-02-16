import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        imageLink: {
            type: String,
            required: false, // Optional image
        },
        author: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        comments: [
            {
                uid: String,
                username: String,
                content: String,
                date: String,
            },
        ],
        likes: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

export const Post = mongoose.model("Post", postSchema);

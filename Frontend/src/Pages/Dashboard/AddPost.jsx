import axios from "axios";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const AddPost = () => {
    const { loggedUser, fetchPosts } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        category: "",
        imageLink: "",
    });
    const navigate = useNavigate();

    const baseUrl = "https://blog-application-7u56.onrender.com/api";

    const handleAddPost = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const postData = {
            ...newPost,
            author: loggedUser.username,
            uid: loggedUser.uid,
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        };

        try {
            await axios.post(`${baseUrl}/posts`, postData);
            await fetchPosts();
            setNewPost({
                title: "",
                content: "",
                category: "",
                imageLink: "",
            });
            navigate("/dashboard");
        } catch (error) {
            console.error("Publish Error:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 md:p-10">
            <form onSubmit={handleAddPost} className="space-y-4 md:space-y-6">
                <div>
                    <label className="mb-2 ml-1 block text-xs font-black text-slate-400 capitalize">
                        Title
                    </label>
                    <input
                        required
                        type="text"
                        value={newPost.title}
                        onChange={(e) =>
                            setNewPost({ ...newPost, title: e.target.value })
                        }
                        placeholder="Enter Post Title"
                        className="h-12 w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 text-sm text-slate-900 transition-all outline-none placeholder:text-sm focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10 md:px-6 md:text-base"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                    <div>
                        <label className="mb-2 ml-1 block text-xs font-black text-slate-400 capitalize">
                            Category
                        </label>
                        <input
                            required
                            type="text"
                            value={newPost.category}
                            onChange={(e) =>
                                setNewPost({
                                    ...newPost,
                                    category: e.target.value,
                                })
                            }
                            placeholder="Enter Category"
                            className="h-12 w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 text-sm text-slate-900 transition-all outline-none placeholder:text-sm focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10 md:px-6 md:text-base"
                        />
                    </div>
                    <div>
                        <label className="mb-2 ml-1 block text-xs font-black text-slate-400 capitalize">
                            Image Link
                        </label>
                        <input
                            type="url"
                            value={newPost.imageLink}
                            onChange={(e) =>
                                setNewPost({
                                    ...newPost,
                                    imageLink: e.target.value,
                                })
                            }
                            placeholder="Enter Image Link"
                            className="h-12 w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 text-sm text-slate-900 transition-all outline-none placeholder:text-sm focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10 md:px-6 md:text-base"
                        />
                    </div>
                </div>
                <div>
                    <label className="mb-2 ml-1 block text-xs font-black text-slate-400 capitalize">
                        Content
                    </label>
                    <textarea
                        required
                        value={newPost.content}
                        onChange={(e) =>
                            setNewPost({ ...newPost, content: e.target.value })
                        }
                        placeholder="Write Content Message"
                        className="h-64 w-full resize-none rounded-3xl border border-slate-100 bg-slate-50 p-6 text-slate-900 transition-all outline-none placeholder:text-sm focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
                    />
                </div>
                <button
                    disabled={isLoading}
                    type="submit"
                    className="h-14 w-full rounded-2xl bg-linear-to-r from-rose-500 to-rose-600 font-black text-white capitalize shadow-lg shadow-rose-500/30 transition-all hover:scale-[1.01] hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                >
                    {isLoading ? "Publishing..." : "Publish Story"}
                </button>
            </form>
        </div>
    );
};

export default AddPost;

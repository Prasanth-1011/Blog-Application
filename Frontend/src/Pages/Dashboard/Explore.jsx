import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { IconMessageCircle, IconArrowRight } from "../../Utils/Icons.jsx";
import Post from "../../Components/Post/Post.jsx";

const Explore = () => {
    const { posts, setPosts, loggedUser, deletePost } = useOutletContext();
    const [viewingPost, setViewingPost] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const [comment, setComment] = useState("");
    const [isCommenting, setIsCommenting] = useState(false);

    const baseUrl = "https://blog-application-7u56.onrender.com/api/posts";

    const toggleLike = async (id) => {
        try {
            const response = await axios.put(`${baseUrl}/${id}/like`, {
                uid: loggedUser.uid,
            });

            const updatedPost = response.data;

            // Update Posts State
            setPosts(posts.map((p) => (p._id === id ? updatedPost : p)));

            // Update ViewingPost
            if (viewingPost && viewingPost._id === id) {
                setViewingPost(updatedPost);
            }

            // Update LikedPosts State
            if (updatedPost.likes.includes(loggedUser.uid)) {
                setLikedPosts((prev) => [...prev, id]);
            } else {
                setLikedPosts((prev) => prev.filter((pId) => pId !== id));
            }
        } catch (error) {
            console.error("Like Error:", error.message);
        }
    };

    const handleAddComment = async () => {
        if (!comment.trim()) return;
        setIsCommenting(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/api/posts/${viewingPost._id}/comment`,
                {
                    uid: loggedUser.uid,
                    username: loggedUser.username,
                    content: comment,
                },
            );

            setViewingPost(response.data);
            setPosts(
                posts.map((p) =>
                    p._id === response.data._id ? response.data : p,
                ),
            );
            setComment("");
        } catch (error) {
            console.error("Comment Error:", error.message);
        } finally {
            setIsCommenting(false);
        }
    };

    if (viewingPost) {
        return (
            <div className="animate-in fade-in zoom-in flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl duration-300 md:flex-row">
                {/* Left Side: Post Details */}
                <div className="custom-scrollbar h-2/3 overflow-y-auto border-slate-100 p-5 sm:p-8 md:h-full md:w-3/5 md:border-r md:p-10 lg:p-14 xl:p-16">
                    <button
                        onClick={() => setViewingPost(null)}
                        className="mb-8 flex items-center gap-2 text-sm font-black text-slate-400 capitalize transition-colors hover:text-rose-500"
                    >
                        ← Back
                    </button>

                    {viewingPost.imageLink && (
                        <div className="mb-8 overflow-hidden rounded-2xl shadow-lg md:rounded-3xl">
                            <img
                                src={viewingPost.imageLink}
                                alt={viewingPost.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    <span className="mb-4 inline-block rounded-lg bg-rose-50 px-3 py-1 text-sm font-black text-rose-600">
                        {viewingPost.category}
                    </span>

                    <h2 className="mb-6 text-xl font-black text-slate-900 sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl">
                        {viewingPost.title}
                    </h2>

                    <div className="mb-8 flex items-center gap-3 border-b border-slate-100 pb-8">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 sm:h-11 sm:w-11 md:h-12 md:w-12">
                            {viewingPost.author.charAt(0)}
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-black text-slate-900 sm:text-base">
                                {viewingPost.author}
                            </p>
                            <p className="text-sm font-medium text-slate-400 capitalize sm:text-sm">
                                {viewingPost.date}
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-sm font-medium whitespace-pre-wrap text-slate-600 sm:text-base md:text-lg lg:text-xl">
                            {viewingPost.content}
                        </p>
                    </div>
                </div>

                {/* Right Side: Comments */}
                <div className="flex h-1/3 flex-col bg-slate-50 md:h-full md:w-2/5 md:bg-white">
                    <div className="border-b border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
                        <h3 className="text-lg font-black text-slate-900 md:text-xl lg:text-3xl">
                            Comments ({viewingPost.comments?.length || 0})
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-slate-400 capitalize sm:text-sm">
                            Engage With The Story
                        </p>
                    </div>

                    <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-5 sm:space-y-8 sm:p-8 md:p-10 lg:p-12">
                        {!viewingPost.comments ||
                        viewingPost.comments.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-200 shadow-sm">
                                    <IconMessageCircle className="h-8 w-8" />
                                </div>
                                <p className="text-sm font-black text-slate-400 capitalize">
                                    No Comments Yet
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {viewingPost.comments.map((comment, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">
                                            {comment.username.charAt(0)}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-black text-slate-900">
                                                    {comment.username}
                                                </p>
                                                <span className="text-xs font-bold text-slate-400">
                                                    {comment.date}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-600">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-200 bg-white p-4 sm:p-6 lg:p-8">
                        <div className="group relative">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a thoughtful comment..."
                                className="min-h-[80px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-900 transition-all outline-none focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10 md:min-h-[60px] md:rounded-[24px] md:bg-white md:pr-14 md:text-sm md:shadow-lg md:shadow-slate-200/50"
                            />
                            <button
                                onClick={handleAddComment}
                                disabled={isCommenting || !comment.trim()}
                                className="absolute right-3 bottom-3 rounded-lg bg-rose-500 px-4 py-1.5 text-xs font-black text-white capitalize shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-600 active:scale-95 disabled:opacity-50 disabled:active:scale-100 md:right-2 md:bottom-2 md:rounded-xl md:p-2.5 md:px-3 md:shadow-none md:hover:bg-rose-500 md:hover:text-white"
                            >
                                <span className="md:hidden">Post Comment</span>
                                <span className="hidden md:block">
                                    <IconArrowRight className="h-5 w-5 -rotate-45" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {posts.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-200 bg-white/50 p-8 text-center sm:p-12">
                    <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                        No Posts Added
                    </h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 pb-20 md:grid-cols-2 md:gap-8">
                    {posts.map((post) => (
                        <Post
                            key={post._id}
                            post={post}
                            loggedUser={loggedUser}
                            isLiked={likedPosts.includes(post._id)}
                            onToggleLike={toggleLike}
                            onDelete={deletePost}
                            onViewDetail={setViewingPost}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Explore;

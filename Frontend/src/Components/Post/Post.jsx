import {
    IconEdit,
    IconTrash,
    IconHeart,
    IconMessageCircle,
} from "../../Utils/Icons.jsx";

const Post = ({ post, loggedUser, onToggleLike, onDelete, onViewDetail }) => {
    const isLiked = post.likes?.includes(loggedUser.uid);
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:border-rose-200 hover:shadow-xl hover:shadow-rose-500/10">
            {post.imageLink && (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                        src={post.imageLink}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="absolute top-4 left-4">
                        <span className="inline-block rounded-lg bg-white/90 px-3 py-1 text-sm font-bold text-rose-600 capitalize shadow-sm backdrop-blur-md">
                            {post.category}
                        </span>
                    </div>
                </div>
            )}

            <div className="flex flex-1 flex-col p-6">
                {!post.imageLink && (
                    <div className="mb-4">
                        <span className="inline-block rounded-lg bg-rose-50 px-3 py-1 text-sm font-bold text-rose-600 capitalize">
                            {post.category}
                        </span>
                    </div>
                )}

                <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600">
                            {post.author.charAt(0)}
                        </div>
                        <p className="text-sm font-bold text-slate-700 capitalize">
                            {post.author}
                        </p>
                    </div>

                    {post.uid === loggedUser.uid && (
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(post._id);
                                }}
                                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                            >
                                <IconTrash className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-rose-600">
                    {post.title}
                </h3>

                <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {post.content}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <p className="text-sm font-medium text-slate-400 capitalize">
                        {post.date}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleLike(post._id);
                            }}
                            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all ${
                                isLiked
                                    ? "bg-rose-50 text-rose-500"
                                    : "bg-transparent text-slate-400 hover:bg-slate-50 hover:text-rose-500"
                            }`}
                        >
                            <IconHeart
                                className="h-3.5 w-3.5"
                                filled={isLiked}
                            />
                            {post.likes?.length > 0 && (
                                <span className="text-sm font-bold">
                                    {post.likes.length}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewDetail(post);
                            }}
                            className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-slate-600 transition-all hover:bg-slate-100 active:scale-95"
                        >
                            <IconMessageCircle className="h-4 w-4" />
                            <span className="text-sm font-bold capitalize">
                                Read
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Post;

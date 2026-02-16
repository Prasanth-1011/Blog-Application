import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Utils/Firebase";
import { Context } from "../../Context";
import {
    IconExplore,
    IconAdd,
    IconUser,
    IconLogout,
    IconMenu,
    IconClose,
} from "../../Utils/Icons.jsx";

const Dashboard = () => {
    const { loggedUser, setLoggedUser, authLoading } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const baseUrl = "https://blog-application-7u56.onrender.com/api/posts";

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(baseUrl);
            setPosts(response.data);
        } catch (error) {
            console.error("Error Fetching Posts:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Protected Route Logic
        if (!authLoading && !loggedUser.loginStatus) {
            navigate("/");
            return;
        }

        if (loggedUser.loginStatus) {
            fetchPosts();
        }
    }, [authLoading, loggedUser.loginStatus, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setLoggedUser({
                loginStatus: false,
                username: "",
                mail: "",
                uid: "",
                photoUrl: "",
            });
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`${baseUrl}/${id}`, {
                data: { uid: loggedUser.uid },
            });
            setPosts(posts.filter((p) => p._id !== id));
        } catch (error) {
            console.error("Delete Error:", error.message);
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { to: "/dashboard", icon: IconExplore, label: "Explore", end: true },
        { to: "/dashboard/create", icon: IconAdd, label: "Add Post" },
        { to: "/dashboard/profile", icon: IconUser, label: "Profile" },
    ];

    if (authLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Lateral Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-cyan-950 transition-all duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex h-20 items-center gap-4 bg-slate-900/30 px-8">
                    <h1 className="text-xl font-black text-white">
                        Blog Application
                    </h1>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2 p-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `group flex items-center gap-4 rounded-2xl px-5 py-4 font-bold transition-all duration-300 ${
                                    isActive
                                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="border-t border-white/5 p-6">
                    <button
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-4 rounded-2xl px-5 py-4 font-bold text-rose-400 transition-all hover:bg-rose-500/10"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 transition-colors group-hover:bg-rose-500/20">
                            <IconLogout className="h-5 w-5" />
                        </div>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            <main className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 md:px-10 lg:px-12">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
                        >
                            <IconMenu className="h-5 w-5" />
                        </button>
                        <h2 className="line-clamp-1 text-lg font-bold text-slate-800 capitalize sm:text-xl md:text-2xl">
                            {loggedUser.username}
                        </h2>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-rose-400 to-rose-600 font-bold text-white capitalize shadow-md sm:h-11 sm:w-11">
                        {loggedUser.username.charAt(0)}
                    </div>
                </header>

                <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto scroll-smooth p-4 sm:p-6 md:p-10 lg:p-12 xl:p-14">
                    {isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
                        </div>
                    ) : (
                        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
                            <Outlet
                                context={{
                                    posts,
                                    setPosts,
                                    loggedUser,
                                    deletePost,
                                    fetchPosts,
                                }}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

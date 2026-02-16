import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

import { Context } from "../../Context";
import Input from "../../Components/Input";
import { auth } from "../../Utils/Firebase";

const Login = () => {
    const { user, setUser, loggedUser, setLoggedUser, authLoading } =
        useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && loggedUser.loginStatus) {
            navigate("/dashboard");
        }
    }, [authLoading, loggedUser.loginStatus, navigate]);

    useEffect(() => {
        if (message.text) {
            const duration = message.type === "success" ? 2000 : 3000;
            const timer = setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message.text, message.type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (message.text) setMessage({ text: "", type: "" });

        setUser((detail) => ({
            ...detail,
            [name]: value,
        }));
    };

    const baseUrl = "https://blog-application-7u56.onrender.com/api";

    const handleLogin = async () => {
        if (user.mail === "" || user.password === "") {
            setMessage({ text: "Please Fill All The Fields", type: "error" });
            return;
        }

        setIsLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const login = await signInWithEmailAndPassword(
                auth,
                user.mail,
                user.password,
            );

            const response = await axios.post(`${baseUrl}/login`, {
                uid: login.user.uid,
            });

            if (response.status === 200) {
                const dbUser = response.data;
                setMessage({ text: "Login Successful!", type: "success" });
                setLoggedUser({
                    loginStatus: true,
                    username:
                        dbUser.username && dbUser.username !== "User"
                            ? dbUser.username
                            : login.user.displayName || "User",
                    mail: dbUser.mail || login.user.email,
                    uid: dbUser.uid || login.user.uid,
                    photoUrl: login.user.photoURL || "",
                    emailVerified: login.user.emailVerified,
                });
            }

            setTimeout(() => {
                setIsLoading(false);
                navigate("/dashboard");
            }, 2000);

            setUser({
                username: "",
                mail: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error("Login Error:", error);

            let firebaseMessage = error.message;

            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
            ) {
                firebaseMessage = "Invalid Credentials!";
            }

            setMessage({ text: firebaseMessage, type: "error" });
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center overflow-hidden bg-(--theme-60) px-4 py-8 transition-all sm:py-12 lg:py-16">
            <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="overflow-hidden rounded-3xl border border-rose-100/50 bg-(--theme-30) shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] transition-all sm:rounded-[40px]">
                    <div className="p-6 sm:p-10 lg:p-14">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-extrabold tracking-wide text-(--text-primary)">
                                Login Blog App
                            </h1>
                            <p className="p-4 text-sm font-medium text-(--text-secondary)">
                                Enter Your Credentials And Access Your Dashboard
                            </p>
                        </div>

                        <form className="space-y-4">
                            {message.text && (
                                <div
                                    className={`message-box message-${message.type}`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <span>{message.text}</span>
                                    </div>
                                </div>
                            )}

                            <Input
                                label="Mail"
                                name="mail"
                                type="email"
                                placeholder="Enter Your Mail"
                                value={user.mail}
                                onChange={handleChange}
                            />

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="ml-2 text-sm font-bold text-slate-400"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-bold text-rose-500 transition-colors hover:text-rose-600"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter Your Password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="flex h-12 w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10 focus:outline-none"
                                />
                            </div>

                            {isLoading ? (
                                <div className="charging-container">
                                    <div className="charging-bar" />
                                    <span className="charging-text">
                                        Logging In...
                                    </span>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    style={{
                                        backgroundImage: "var(--theme-10)",
                                    }}
                                    onClick={handleLogin}
                                    className="group relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl px-6 py-3 font-bold text-white shadow-[0_10px_20px_rgba(244,63,94,0.2)] transition-all hover:scale-[1.01] hover:shadow-[0_15px_30px_rgba(244,63,94,0.3)] active:scale-[0.98] disabled:opacity-50"
                                >
                                    <span className="relative">Login</span>
                                    <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-20" />
                                </button>
                            )}
                        </form>

                        <p className="mt-8 flex items-center justify-center gap-2">
                            <span className="text-sm font-medium text-(--text-secondary)">
                                New Here?{" "}
                            </span>
                            <Link
                                to="/register"
                                className="font-bold text-rose-500 transition-colors hover:text-rose-600"
                            >
                                Create New Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;

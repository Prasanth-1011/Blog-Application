import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

import { Context } from "../../Context";
import Input from "../../Components/Input";
import { auth } from "../../Utils/Firebase";

const ForgotPassword = () => {
    const { user, setUser, loggedUser, authLoading } = useContext(Context);
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

    const handleReset = async () => {
        if (user.mail === "") {
            setMessage({
                text: "Please Enter Your Registered Mail",
                type: "error",
            });
            return;
        }

        setIsLoading(true);
        setMessage({ text: "", type: "" });

        try {
            await sendPasswordResetEmail(auth, user.mail);
            setMessage({
                text: "Password Reset Link Sent To Your Email!",
                type: "success",
            });
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            console.error("Password Reset Error:", error);
            setMessage({ text: error.message, type: "error" });
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center overflow-hidden bg-(--theme-60) px-4 py-12">
            <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-rose-100/50 bg-(--theme-30) shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] transition-all">
                    <div className="p-10">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-extrabold text-(--text-primary)">
                                Reset Password
                            </h1>
                            <p className="p-4 text-sm font-medium text-(--text-secondary)">
                                Enter Your Email To Receive Password Reset Link
                            </p>
                        </div>

                        <form className="space-y-4">
                            {message.text && (
                                <div
                                    className={`message-box message-${message.type}`}
                                >
                                    {message.text}
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

                            {isLoading ? (
                                <div className="charging-container">
                                    <div className="charging-bar" />
                                    <span className="charging-text">
                                        Processing Reset...
                                    </span>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    style={{
                                        backgroundImage: "var(--theme-10)",
                                    }}
                                    onClick={handleReset}
                                    className="group relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl px-6 py-3 font-bold text-white shadow-[0_10px_20px_rgba(244,63,94,0.2)] transition-all hover:scale-[1.01] hover:shadow-[0_15px_30px_rgba(244,63,94,0.3)] active:scale-[0.98] disabled:opacity-50"
                                >
                                    <span className="relative">
                                        Send Reset Link
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-20" />
                                </button>
                            )}
                        </form>

                        <p className="mt-8 flex items-center justify-center gap-2">
                            <span className="text-sm font-medium text-(--text-secondary)">
                                Back To{" "}
                            </span>
                            <Link
                                to="/"
                                className="font-bold text-rose-500 transition-colors hover:text-rose-600"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;

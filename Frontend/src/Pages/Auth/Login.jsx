import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import Input from "../../Components/Input";

const Login = () => {
    const { user, setUser } = useContext(Context);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((detail) => ({
            ...detail,
            [name]: value,
        }));
    };

    return (
        <main className="flex min-h-screen items-center justify-center overflow-hidden bg-(--theme-60) px-4 py-12 selection:bg-rose-500/30">
            <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-rose-100/50 bg-(--theme-30) shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] transition-all">
                    <div className="p-10">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-extrabold text-(--text-primary)">
                                Login Blog App
                            </h1>
                            <p className="p-4 text-sm font-medium text-(--text-secondary)">
                                Enter Your Credentials And Access Your Dashboard
                            </p>
                        </div>

                        <form className="space-y-4">
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
                                        className="ml-1 text-xs font-bold tracking-widest text-slate-400"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs font-bold text-rose-500 transition-colors hover:text-rose-600"
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

                            <button
                                type="button"
                                style={{ backgroundImage: "var(--theme-10)" }}
                                className="group relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl px-6 py-3 font-bold tracking-wide text-white shadow-[0_10px_20px_rgba(244,63,94,0.2)] transition-all hover:scale-[1.01] hover:shadow-[0_15px_30px_rgba(244,63,94,0.3)] active:scale-[0.98] disabled:opacity-50"
                            >
                                <span className="relative">Login</span>
                                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-20" />
                            </button>
                        </form>

                        <p className="mt-8 flex items-center justify-center gap-2">
                            <span className="text-sm font-medium text-(--text-secondary)">
                                New Here?{" "}
                            </span>
                            <Link
                                to="/register"
                                className="font-bold text-rose-500 transition-colors hover:text-rose-600"
                            >
                                Get Started
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import Input from "../../Components/Input";

const Register = () => {
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
                                Register Account
                            </h1>
                        </div>

                        <form className="space-y-4">
                            <Input
                                label="Username"
                                name="username"
                                type="text"
                                placeholder="Enter Your Username"
                                value={user.username}
                                onChange={handleChange}
                            />

                            <Input
                                label="Mail"
                                name="mail"
                                type="email"
                                placeholder="Enter Your Mail"
                                value={user.mail}
                                onChange={handleChange}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter Your Password"
                                value={user.password}
                                onChange={handleChange}
                            />

                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Your Password"
                                value={user.confirmPassword}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                style={{ backgroundImage: "var(--theme-10)" }}
                                className="group relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl px-6 py-3 font-bold tracking-wide text-white shadow-[0_10px_20px_rgba(244,63,94,0.2)] transition-all hover:scale-[1.01] hover:shadow-[0_15px_30px_rgba(244,63,94,0.3)] active:scale-[0.98] disabled:opacity-50"
                            >
                                <span className="relative">Register</span>
                                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-20" />
                            </button>
                        </form>

                        <p className="mt-8 flex items-center justify-center gap-2">
                            <span className="text-sm font-medium text-(--text-secondary)">
                                Already Have An Account?{" "}
                            </span>
                            <Link
                                to="/login"
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

export default Register;

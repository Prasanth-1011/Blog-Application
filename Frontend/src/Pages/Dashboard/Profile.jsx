import { useOutletContext } from "react-router-dom";

const Profile = () => {
    const { loggedUser, posts } = useOutletContext();

    const userStories = posts.filter((p) => p.uid === loggedUser.uid).length;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 mx-auto max-w-5xl duration-1000">
            <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col md:flex-row">
                    <div className="relative flex min-h-[350px] w-full flex-col items-center justify-center bg-linear-to-br from-slate-900 to-cyan-950 p-6 text-white sm:min-h-[400px] sm:p-10 md:min-h-[500px] md:w-[40%] lg:w-[35%] xl:w-[30%]">
                        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

                        <div className="relative z-10">
                            {loggedUser.photoUrl ? (
                                <div className="group relative">
                                    <img
                                        src={loggedUser.photoUrl}
                                        alt={loggedUser.username}
                                        className="h-32 w-32 rounded-[36px] border-4 border-white/20 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105 sm:h-40 sm:w-40 sm:rounded-[44px] md:h-48 md:w-48 md:rounded-[56px]"
                                    />
                                    <div className="absolute inset-0 rounded-[36px] ring-1 ring-white/40 sm:rounded-[44px] md:rounded-[56px]" />
                                </div>
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-[36px] bg-linear-to-br from-rose-400 to-rose-600 text-3xl font-black shadow-2xl transition-transform duration-500 hover:scale-105 sm:h-32 sm:w-32 sm:rounded-[44px] sm:text-4xl md:h-36 md:w-36 md:rounded-[56px] md:text-6xl">
                                    {loggedUser.username.charAt(0)}
                                </div>
                            )}
                        </div>

                        <div className="relative z-10 mt-6 text-center sm:mt-8 md:mt-10">
                            <h2 className="text-2xl font-black text-white capitalize sm:text-3xl md:text-3xl">
                                {loggedUser.username}
                            </h2>
                        </div>

                        <div className="absolute right-6 bottom-6 left-6 flex justify-center border-t border-white/10 pt-6 sm:right-10 sm:bottom-8 sm:pt-8 md:right-12 md:left-12">
                            <div
                                className={`flex items-center gap-2 rounded-full border border-white/10 ${loggedUser.emailVerified ? "bg-emerald-500/10" : "bg-amber-500/10"} px-4 py-2 backdrop-blur-md`}
                            >
                                <div
                                    className={`h-1.5 w-1.5 animate-pulse rounded-full ${loggedUser.emailVerified ? "bg-emerald-400" : "bg-amber-400"} sm:h-2 sm:w-2`}
                                />
                                <span
                                    className={`text-sm font-bold ${loggedUser.emailVerified ? "text-emerald-100" : "text-amber-100"}`}
                                >
                                    {loggedUser.emailVerified
                                        ? "Verified Profile"
                                        : "Not Verified"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-12 md:p-16 lg:p-20">
                        <div className="mb-8 md:mb-14">
                            <h3 className="text-xs font-black text-slate-400 sm:text-sm">
                                Account Overview
                            </h3>
                            <h4 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">
                                Growth & Insights
                            </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
                            <div className="group rounded-[32px] border border-slate-100 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-rose-500/5 sm:p-8 md:p-10">
                                <p className="text-3xl font-black text-slate-900 sm:text-3xl md:text-3xl">
                                    {userStories}
                                </p>
                                <p className="mt-1 font-bold text-slate-400">
                                    Published Stories
                                </p>
                            </div>

                            <div className="group rounded-[32px] border border-slate-100 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-cyan-500/5 sm:p-8 md:p-10">
                                <p className="text-3xl font-black text-slate-900 sm:text-3xl md:text-3xl">
                                    Active
                                </p>
                                <p className="mt-1 font-bold text-slate-400">
                                    Membership Status
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-10 text-center font-medium text-slate-400">
                Data Accurately Reflected From Insight Core Database &bull; 2026
            </p>
        </div>
    );
};

export default Profile;

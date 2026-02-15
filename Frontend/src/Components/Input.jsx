const Input = ({ label, name, type, placeholder, value, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="ml-1 text-xs font-bold tracking-widest text-slate-400"
            >
                {label}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="flex h-12 w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10 focus:outline-none"
            />
        </div>
    );
};

export default Input;

import { useState, createContext } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState({
        username: "",
        mail: "",
        password: "",
        confirmPassword: "",
    });

    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;

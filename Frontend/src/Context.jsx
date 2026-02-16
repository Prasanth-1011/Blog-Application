import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Utils/Firebase";

export const Context = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState({
        username: "",
        mail: "",
        password: "",
        confirmPassword: "",
    });

    const [loggedUser, setLoggedUser] = useState({
        loginStatus: false,
        username: "",
        mail: "",
        uid: "",
        photoUrl: "",
    });

    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setLoggedUser({
                    loginStatus: true,
                    username: firebaseUser.displayName || "User",
                    mail: firebaseUser.email,
                    uid: firebaseUser.uid,
                    photoUrl: firebaseUser.photoURL || "",
                    emailVerified: firebaseUser.emailVerified,
                });
            } else {
                setLoggedUser({
                    loginStatus: false,
                    username: "",
                    mail: "",
                    uid: "",
                    photoUrl: "",
                    emailVerified: false,
                });
            }
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Context.Provider
            value={{ user, setUser, loggedUser, setLoggedUser, authLoading }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;

import { createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import axios from "axios";

interface AuthProps {
    children: React.ReactNode;
}
interface User {
    [key: string]: any;
}
interface ContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const authContext = createContext<ContextProps>({} as ContextProps);

export const AuthContextProvider: React.FC<AuthProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const checkAuth = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL_DEV}/profile`, { withCredentials: true });
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return <authContext.Provider value={{ user, setUser }}>{children}</authContext.Provider>;
};

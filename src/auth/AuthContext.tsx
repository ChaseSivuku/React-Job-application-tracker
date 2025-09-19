import react, {createContext, useContext, useEffect, useState, type ReactNode} from 'react';
import axios  from 'axios';
import type { User}  from '../types'

type AuthContextType = {
    user: User | null,
    login: (user: User) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined> (undefined);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(() => {
        const raw = localStorage.getItem("authUser");
        return raw ? JSON.parse(raw): null
    });


    const login = (user: User) => {
        setUser(user);
        localStorage.setItem("authUser",JSON.stringify(user));
    };

     const logout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
     };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()  => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used insode the AuthProvider");
    return ctx;
};

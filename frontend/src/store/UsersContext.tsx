import { createContext, useState, type PropsWithChildren } from "react";

interface User {
    userName: string;
    setUser: (user: string) => void;
}

export const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: PropsWithChildren) => {
    const [userName, setUserState] = useState<string>(() => {
        return localStorage.getItem("userName") || "";
    });

    const setUserName = (newUser: string) => {
        setUserState(newUser);

        if (newUser) {
            localStorage.setItem("userName", newUser);
        } else {
            localStorage.removeItem("userName");
        }
    };

    return (
        <UserContext.Provider value={{ userName, setUser: setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

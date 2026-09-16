import React, { useContext, useState, type ReactNode } from "react";
import logo from "../assets/logo.png";
import { createExplorer } from "../services/favoritesService";
import { UserContext } from "../store/UsersContext";

const LoginPage = ({ children }: { children: ReactNode }) => {
    const context = useContext(UserContext);

    if (!context) {
        return <p>Error: UserContext is missing</p>;
    }

    const { userName, setUser } = context;
    const [inputValue, setInputValue] = useState("");

    if (userName) {
        return <>{children}</>;
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const trimmedName = inputValue.trim();
        if (trimmedName === "") {
            alert("אנא הכנס שם משתמש תקין");
            return;
        }

        try {
            await createExplorer(trimmedName);
        } catch (err) {
            const status = (err as { response?: { status?: number } }).response
                ?.status;

            if (status !== 409) {
                console.error("failed to register explorer:", err);
            }
        }

        setUser(trimmedName);
        setInputValue("");
    };

    return (
        <div className="login-screen">
            <img src={logo} alt="ClimeBoard" className="logo login-logo" />
            <form onSubmit={handleSubmit}>
                <h2>ברוך הבא ל ClimeBoard</h2>
                <label>
                    שם משתמש:
                    <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={20}
                        placeholder="השם שלך"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </label>
                <button type="submit">הרשם</button>
            </form>
        </div>
    );
};

export default LoginPage;

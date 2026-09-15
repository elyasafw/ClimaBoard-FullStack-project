import React, { useContext, useState, type ReactNode } from "react";
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

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        if (inputValue.trim() === "") {
            alert("אנא הכנס שם משתמש תקין");
            return;
        }

        setUser(inputValue);
        setInputValue("");
    };

    return (
        <>
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
        </>
    );
};

export default LoginPage;

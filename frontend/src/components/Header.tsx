import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../store/UsersContext";

const Header = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        context?.setUser("");
        navigate("/");
    };

    return (
        <header>
            <h1>ClimeBoard</h1>
            <nav>
                <NavLink to={"/"}>דף הבית</NavLink>
                <NavLink to={"/search"}>חיפוש</NavLink>
                <NavLink to={"/compare"}>השוואה</NavLink>
                <NavLink to={"/favorites"}>מועדפים</NavLink>
            </nav>
            <button onClick={handleLogout}>יציאה</button>
        </header>
    );
};

export default Header;

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from "../store/UsersContext";

const Header = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        context?.setUser("");
        navigate("/");
    };

    return (
        <header className="app-header">
            <img src={logo} alt="ClimeBoard" className="logo" />
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

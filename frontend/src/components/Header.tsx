import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1>ClimeBoard</h1>
            <nav>
                <NavLink to={"/"}>דף הבית</NavLink>
                <NavLink to={"/search"}>חיפוש</NavLink>
                <NavLink to={"/compare"}>השוואה</NavLink>
                <NavLink to={"/favorites"}>מועדפים</NavLink>
            </nav>
        </header>
    );
};

export default Header;

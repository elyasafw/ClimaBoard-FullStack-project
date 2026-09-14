import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1>ClimaBoard</h1>
            <nav>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/favorites"}>Favorites</NavLink>
                <NavLink to={"/compare"}>Compare</NavLink>
            </nav>
        </header>
    );
};

export default Header;

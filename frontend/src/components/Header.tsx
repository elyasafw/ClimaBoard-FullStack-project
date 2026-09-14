import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1>ClimaBoard</h1>
            <nav>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/search"}>Search</NavLink>
                <NavLink to={"/compare"}>Compare</NavLink>
                <NavLink to={"/favorites"}>Favorites</NavLink>
            </nav>
        </header>
    );
};

export default Header;

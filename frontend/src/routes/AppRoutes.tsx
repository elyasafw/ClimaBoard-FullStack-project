import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import CityDetails from "../pages/CityDetails";
import ComparePage from "../pages/ComparePage";
import FavoritesPage from "../pages/FavoritesPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                element={
                    <LoginPage>
                        <Layout />
                    </LoginPage>
                }
            >
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />}>
                    <Route path="city/:id" element={<CityDetails />} />
                </Route>
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="compare" element={<ComparePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

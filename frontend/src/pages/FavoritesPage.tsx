import { useContext, useEffect, useState } from "react";
import FavoritesList from "../components/FavoritesList";
import { UserContext } from "../store/UsersContext";
import { useFavoritesStore } from "../store/useFavoritesStore";

const FavoritesPage = () => {
    const context = useContext(UserContext);
    const { favorites, error, fetchFavorites, removeFavorite } =
        useFavoritesStore();
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        if (context?.userName) {
            fetchFavorites(context.userName);
        }
    }, [context?.userName, fetchFavorites]);

    if (!context) {
        return <p>Error: UserContext is missing</p>;
    }

    const handleDelete = async (id: number) => {
        try {
            await removeFavorite(context.userName, id);
            setDeleteError(null);
        } catch {
            setDeleteError("שגיאה במחיקת המועדף");
        }
    };

    return (
        <>
            <h2>ערים מועדפות</h2>
            {error && <p>{error}</p>}
            {deleteError && <p>{deleteError}</p>}
            {!error && favorites.length === 0 && <p>אין לך עדיין ערים מועדפות</p>}
            <FavoritesList favorites={favorites} onDelete={handleDelete} />
        </>
    );
};

export default FavoritesPage;

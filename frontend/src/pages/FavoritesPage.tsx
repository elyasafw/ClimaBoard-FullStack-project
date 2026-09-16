import { useContext, useEffect, useState } from "react";
import FavoritesList from "../components/FavoritesList";
import { UserContext } from "../store/UsersContext";
import { useFavoritesStore } from "../store/useFavoritesStore";

const FavoritesPage = () => {
    const context = useContext(UserContext);
    const { favorites, error, loading, fetchFavorites, removeFavorite } =
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
        <div className="page-center">
            <h2>ערים מועדפות</h2>
            {loading && <p>טוען מועדפים...</p>}
            {error && <p>{error}</p>}
            {deleteError && <p>{deleteError}</p>}
            {!loading && !error && favorites.length === 0 && (
                <p>אין לך עדיין ערים מועדפות</p>
            )}
            <FavoritesList favorites={favorites} onDelete={handleDelete} />
        </div>
    );
};

export default FavoritesPage;

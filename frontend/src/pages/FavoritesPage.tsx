import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    getFavorites,
    removeFavorite,
    type Favorite,
} from "../services/favoritesService";
import { UserContext } from "../store/UsersContext";
import { useFetch } from "../hooks/useFetch";

const FavoritesPage = () => {
    const context = useContext(UserContext);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const favoritesFetch = useMemo(() => {
        if (!context?.userName) return null;
        return () => getFavorites(context.userName);
    }, [context?.userName]);

    const { data, error } = useFetch(favoritesFetch);

    useEffect(() => {
        if (data) {
            setFavorites(data.data.favorites);
        }
    }, [data]);

    if (!context) {
        return <p>Error: UserContext is missing</p>;
    }

    const handleDelete = async (id: number) => {
        try {
            await removeFavorite(context.userName, id);
            setFavorites((prev) => prev.filter((f) => f.id !== id));
            setDeleteError(null);
        } catch {
            setDeleteError("שגיאה במחיקת המועדף");
        }
    };

    return (
        <>
            <h2>ערים מועדפות</h2>
            {error && <p>שגיאה בשליפת המועדפים</p>}
            {deleteError && <p>{deleteError}</p>}
            {!error && favorites.length === 0 && <p>אין לך עדיין ערים מועדפות</p>}
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.id}>
                        <Link
                            to={`/city/${favorite.id}?lat=${favorite.latitude}&lon=${favorite.longitude}&name=${favorite.name}`}
                        >
                            {favorite.name} {favorite.country ? `| ${favorite.country}` : ""}
                        </Link>
                        <button onClick={() => handleDelete(favorite.id)}>הסר</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default FavoritesPage;

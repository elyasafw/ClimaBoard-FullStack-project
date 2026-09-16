import { Link } from "react-router-dom";
import type { Favorite } from "../services/favoritesService";

const FavoritesList = ({
    favorites,
    onDelete,
}: {
    favorites: Favorite[];
    onDelete: (id: number) => void;
}) => {
    return (
        <ul>
            {favorites.map((favorite) => (
                <li key={favorite.id}>
                    <Link
                        to={`/city/${favorite.id}?lat=${favorite.latitude}&lon=${favorite.longitude}&name=${favorite.name}&country=${favorite.country}`}
                    >
                        {favorite.name}{" "}
                        {favorite.country ? `| ${favorite.country}` : ""}
                    </Link>
                    <button onClick={() => onDelete(favorite.id)}>הסר</button>
                </li>
            ))}
        </ul>
    );
};

export default FavoritesList;

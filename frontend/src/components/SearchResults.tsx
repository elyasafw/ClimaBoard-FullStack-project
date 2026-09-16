import { Link } from "react-router-dom";
import type { SearchData } from "../services/searchService";

const SearchResults = ({
    results,
    searchError,
}: {
    results: SearchData | null;
    searchError: string | null;
}) => {
    return (
        <>
            {searchError && <p>שגיאה בקבלת נתוני החיפוש</p>}
            {results && !results.results?.length && <p>לא נמצאו ערים</p>}
            {results &&
                results.results?.map((r) => {
                    const params = new URLSearchParams({
                        lat: String(r.latitude),
                        lon: String(r.longitude),
                        name: r.name,
                        country: r.country ?? "לא ידוע",
                    });

                    return (
                        <Link to={`/city/${r.id}?${params}`} key={r.id}>
                            <h3>
                                עיר: {r.name}
                                {r.country ? ` | מדינה: ${r.country}` : ""}
                            </h3>
                        </Link>
                    );
                })}
        </>
    );
};

export default SearchResults;

import type { SearchData } from "../services/searchService";

const SearchResults = ({
    results,
    searchError,
}: {
    results: SearchData | null;
    searchError: string | null;
}) => {
    const cities = results && results.results;
    return (
        <>
            {searchError && <p>שגיאה בקבלת נתוני החיפוש</p>}
            {cities?.map((r) => {
                return (
                    <div key={r.id}>
                        <h3>
                            עיר: {r.name}
                            {r.country ? ` | מדינה: ${r.country}` : ""}
                        </h3>
                    </div>
                );
            })}
        </>
    );
};

export default SearchResults;

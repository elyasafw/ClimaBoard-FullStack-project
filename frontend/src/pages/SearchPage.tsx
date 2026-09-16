import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useFetch } from "../hooks/useFetch";
import { getSearchResults, type SearchData } from "../services/searchService";

const SearchPage = () => {
    const [filter, setFilter] = useState<string>("");

    const citiesFetch = useMemo(() => {
        return filter ? () => getSearchResults(filter) : null;
    }, [filter]);

    const { data: results, error: searchError, loading } =
        useFetch<SearchData>(citiesFetch);

    return (
        <>
            <h2>חיפוש מזג אוויר לפי עיר</h2>
            <SearchBar setFilter={setFilter} />
            {loading && <p>מחפש...</p>}
            <SearchResults results={results} searchError={searchError} />
        </>
    );
};

export default SearchPage;

import { useEffect, useRef } from "react";

interface SearchProps {
    setFilter: (filter: string) => void;
}

const SearchBar = ({ setFilter }: SearchProps) => {
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    return (
        <div>
            חיפוש עיר
            <input
                ref={searchRef}
                type="text"
                placeholder="הזן עיר לחיפוש"
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;

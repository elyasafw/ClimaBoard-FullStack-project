import React, { useEffect, useRef } from "react";

interface SearchProps {
    setFilter: (filter: string) => void;
}

const SearchBar = ({ setFilter }: SearchProps) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<number | null>(null);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setFilter(value);
        }, 400);
    };

    return (
        <div>
            חיפוש עיר
            <input
                ref={searchRef}
                type="text"
                placeholder="הזן עיר לחיפוש"
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;

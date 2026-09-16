import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getSearchResults, type SearchData } from "../services/searchService";

export interface PickedCity {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
}

const CityPicker = ({
    label,
    selected,
    onSelect,
    onClear,
}: {
    label: string;
    selected: PickedCity | null;
    onSelect: (city: PickedCity) => void;
    onClear: () => void;
}) => {
    const [filter, setFilter] = useState("");
    const debounceRef = useRef<number | null>(null);

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

    const citiesFetch = useMemo(() => {
        return filter.trim().length >= 2 ? () => getSearchResults(filter) : null;
    }, [filter]);

    const { data: results, error } = useFetch<SearchData>(citiesFetch);

    if (selected) {
        return (
            <div>
                <p>
                    {label}: {selected.name}
                    {selected.country ? ` | ${selected.country}` : ""}
                </p>
                <button onClick={onClear}>בחר עיר אחרת</button>
            </div>
        );
    }

    return (
        <div>
            <label>
                {label}
                <input type="text" placeholder="הזן עיר" onChange={handleChange} />
            </label>
            {error && <p>שגיאה בקבלת תוצאות חיפוש</p>}
            {results && !results.results?.length && <p>לא נמצאו ערים</p>}
            <ul>
                {results?.results?.map((r) => (
                    <li key={r.id}>
                        <button onClick={() => onSelect(r)}>
                            {r.name}
                            {r.country ? ` | ${r.country}` : ""}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CityPicker;

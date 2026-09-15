import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";

export function useFetch<T>(fetch: (() => Promise<AxiosResponse<T>>) | null) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!fetch) return;

        fetch()
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                console.error("useFetch failed:", err);
                setError("שגיאה בשליפת הנתונים");
            });
    }, [fetch]);

    return { data, error };
}

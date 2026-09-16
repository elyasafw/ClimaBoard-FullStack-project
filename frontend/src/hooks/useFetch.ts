import { useEffect, useRef, useState } from "react";
import type { AxiosResponse } from "axios";

export function useFetch<T>(fetch: (() => Promise<AxiosResponse<T>>) | null) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const requestId = useRef(0);

    useEffect(() => {
        if (!fetch) return;

        const currentRequestId = ++requestId.current;

        fetch()
            .then((response) => {
                if (currentRequestId !== requestId.current) return;
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                if (currentRequestId !== requestId.current) return;
                console.error("useFetch failed:", err);
                setError("שגיאה בשליפת הנתונים");
            });
    }, [fetch]);

    return { data, error };
}

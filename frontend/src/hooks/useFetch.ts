import { useEffect, useRef, useState } from "react";
import type { AxiosResponse } from "axios";

export function useFetch<T>(fetch: (() => Promise<AxiosResponse<T>>) | null) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const requestId = useRef(0);

    useEffect(() => {
        const currentRequestId = ++requestId.current;

        if (!fetch) {
            setData(null);
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);

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
            })
            .finally(() => {
                if (currentRequestId !== requestId.current) return;
                setLoading(false);
            });
    }, [fetch]);

    return { data, error, loading };
}

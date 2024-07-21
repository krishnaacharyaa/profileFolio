"use client"

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

// Define a type for the hook's return value
interface UseApiResult {
    data: any;
    error: AxiosError | null;
    loading: boolean;
}

function useApi(url: string, refresh?: boolean): UseApiResult {
    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user?.accessToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${backendUrl}${url}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.accessToken}`
                    }
                });
                setData(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof AxiosError ? err : new AxiosError('An error occurred'));
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, session?.user?.accessToken, refresh]);

    return { data, error, loading };
}

export default useApi;
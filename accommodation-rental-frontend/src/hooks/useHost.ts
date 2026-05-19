import { useEffect, useState } from "react";
import type { Host } from "../types/host";
import hostRepository from "../api/hostRepository";

const useHost = (id: number | undefined) => {
    const [host, setHost] = useState<Host | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Host id is missing.");
            setLoading(false);
            return;
        }

        hostRepository.findById(id)
            .then((data) => {
                setHost(data);
            })
            .catch(() => {
                setError("Failed to load host.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return {
        host,
        loading,
        error,
    };
};

export default useHost;
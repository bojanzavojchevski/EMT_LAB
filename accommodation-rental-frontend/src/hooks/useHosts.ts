import { useEffect, useState } from "react";
import type { Host } from "../types/host";
import hostRepository from "../api/hostRepository";

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        hostRepository.findAll()
            .then((data) => {
                setHosts(data);
            })
            .catch(() => {
                setError("Failed to load hosts.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        hosts,
        loading,
        error,
    };
};

export default useHosts;
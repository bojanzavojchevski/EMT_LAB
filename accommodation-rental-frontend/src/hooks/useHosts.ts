import { useCallback, useEffect, useState } from "react";
import type {
    CreateHostRequest,
    Host,
    UpdateHostRequest,
} from "../types/host";
import hostRepository from "../api/hostRepository";

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHosts = useCallback(() => {
        setLoading(true);
        setError(null);

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

    useEffect(() => {
        fetchHosts();
    }, [fetchHosts]);

    const createHost = async (request: CreateHostRequest) => {
        await hostRepository.create(request);
        fetchHosts();
    };

    const updateHost = async (id: number, request: UpdateHostRequest) => {
        await hostRepository.update(id, request);
        fetchHosts();
    };

    const deleteHost = async (id: number) => {
        await hostRepository.deleteById(id);
        fetchHosts();
    };

    return {
        hosts,
        loading,
        error,
        refetch: fetchHosts,
        createHost,
        updateHost,
        deleteHost,
    };
};

export default useHosts;
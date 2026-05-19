import { useCallback, useEffect, useState } from "react";
import type {
    Accommodation,
    CreateAccommodationRequest,
    UpdateAccommodationRequest,
} from "../types/accommodation";
import accommodationRepository from "../api/accommodationRepository";

const useAccommodations = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAccommodations = useCallback(() => {
        setLoading(true);
        setError(null);

        accommodationRepository.findAll()
            .then((data) => {
                setAccommodations(data);
            })
            .catch(() => {
                setError("Failed to load accommodations.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchAccommodations();
    }, [fetchAccommodations]);

    const createAccommodation = async (request: CreateAccommodationRequest) => {
        await accommodationRepository.create(request);
        fetchAccommodations();
    };

    const updateAccommodation = async (
        id: number,
        request: UpdateAccommodationRequest
    ) => {
        await accommodationRepository.update(id, request);
        fetchAccommodations();
    };

    const deleteAccommodation = async (id: number) => {
        await accommodationRepository.deleteById(id);
        fetchAccommodations();
    };

    return {
        accommodations,
        loading,
        error,
        refetch: fetchAccommodations,
        createAccommodation,
        updateAccommodation,
        deleteAccommodation,
    };
};

export default useAccommodations;
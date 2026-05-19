import { useEffect, useState } from "react";
import type { Accommodation } from "../types/accommodation";
import accommodationRepository from "../api/accommodationRepository";

const useAccommodations = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

    return {
        accommodations,
        loading,
        error,
    };
};

export default useAccommodations;
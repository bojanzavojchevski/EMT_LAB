import { useEffect, useState } from "react";
import type { Accommodation } from "../types/accommodation";
import accommodationRepository from "../api/accommodationRepository";

const useAccommodation = (id: number | undefined) => {
    const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Accommodation id is missing.");
            setLoading(false);
            return;
        }

        accommodationRepository.findById(id)
            .then((data) => {
                setAccommodation(data);
            })
            .catch(() => {
                setError("Failed to load accommodation.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return {
        accommodation,
        loading,
        error,
    };
};

export default useAccommodation;
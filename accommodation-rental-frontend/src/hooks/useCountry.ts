import { useEffect, useState } from "react";
import type { Country } from "../types/country";
import countryRepository from "../api/countryRepository";

const useCountry = (id: number | undefined) => {
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Country id is missing.");
            setLoading(false);
            return;
        }

        countryRepository.findById(id)
            .then((data) => {
                setCountry(data);
            })
            .catch(() => {
                setError("Failed to load country.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return {
        country,
        loading,
        error,
    };
};

export default useCountry;
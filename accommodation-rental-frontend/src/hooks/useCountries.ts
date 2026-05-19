import { useEffect, useState } from "react";
import type { Country } from "../types/country";
import countryRepository from "../api/countryRepository";

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        countryRepository.findAll()
            .then((data) => {
                setCountries(data);
            })
            .catch(() => {
                setError("Failed to load countries.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        countries,
        loading,
        error,
    };
};

export default useCountries;
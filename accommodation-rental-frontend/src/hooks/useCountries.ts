import { useCallback, useEffect, useState } from "react";
import type {
    Country,
    CreateCountryRequest,
    UpdateCountryRequest,
} from "../types/country";
import countryRepository from "../api/countryRepository";

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = useCallback(() => {
        setLoading(true);
        setError(null);

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

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    const createCountry = async (request: CreateCountryRequest) => {
        await countryRepository.create(request);
        fetchCountries();
    };

    const updateCountry = async (id: number, request: UpdateCountryRequest) => {
        await countryRepository.update(id, request);
        fetchCountries();
    };

    const deleteCountry = async (id: number) => {
        await countryRepository.deleteById(id);
        fetchCountries();
    };

    return {
        countries,
        loading,
        error,
        refetch: fetchCountries,
        createCountry,
        updateCountry,
        deleteCountry,
    };
};

export default useCountries;
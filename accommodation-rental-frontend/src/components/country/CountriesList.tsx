import { Box } from "@mui/material";
import type { Country } from "../../types/country";
import CountryCard from "./CountryCard";

interface CountriesListProps {
    countries: Country[];
}

const CountriesList = ({ countries }: CountriesListProps) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 2,
            }}
        >
            {countries.map((country) => (
                <CountryCard key={country.id} country={country} />
            ))}
        </Box>
    );
};

export default CountriesList;
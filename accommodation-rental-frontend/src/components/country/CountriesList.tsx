import { Box } from "@mui/material";
import type { Country } from "../../types/country";
import CountryCard from "./CountryCard";

interface CountriesListProps {
    countries: Country[];
    canManage: boolean;
    onEdit: (country: Country) => void;
    onDelete: (id: number) => void;
}

const CountriesList = ({
                           countries,
                           canManage,
                           onEdit,
                           onDelete,
                       }: CountriesListProps) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 2,
            }}
        >
            {countries.map((country) => (
                <CountryCard
                    key={country.id}
                    country={country}
                    canManage={canManage}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Box>
    );
};

export default CountriesList;
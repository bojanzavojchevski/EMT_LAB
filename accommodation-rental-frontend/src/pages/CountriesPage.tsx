import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import useCountries from "../hooks/useCountries";
import CountriesList from "../components/country/CountriesList";

const CountriesPage = () => {
    const { countries, loading, error } = useCountries();

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Stack spacing={3}>
            <Typography variant="h4">
                Countries
            </Typography>

            <CountriesList countries={countries} />
        </Stack>
    );
};

export default CountriesPage;
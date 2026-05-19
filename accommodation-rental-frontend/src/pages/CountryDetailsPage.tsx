import { Alert, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import useCountry from "../hooks/useCountry";

const CountryDetailsPage = () => {
    const { id } = useParams();
    const countryId = id ? Number(id) : undefined;

    const { country, loading, error } = useCountry(countryId);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!country) {
        return <Alert severity="warning">Country not found.</Alert>;
    }

    return (
        <Stack spacing={3}>
            <Button component={RouterLink} to="/countries" variant="outlined">
                Back to countries
            </Button>

            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {country.name}
                    </Typography>

                    <Typography variant="body1">
                        ID: {country.id}
                    </Typography>

                    <Typography variant="body1">
                        Continent: {country.continent ?? "N/A"}
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default CountryDetailsPage;
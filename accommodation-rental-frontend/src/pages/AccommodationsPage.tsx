import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import useAccommodations from "../hooks/useAccommodations";
import AccommodationsList from "../components/accommodation/AccommodationsList";

const AccommodationsPage = () => {
    const { accommodations, loading, error } = useAccommodations();

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Stack spacing={3}>
            <Typography variant="h4">
                Accommodations
            </Typography>

            <AccommodationsList accommodations={accommodations} />
        </Stack>
    );
};

export default AccommodationsPage;
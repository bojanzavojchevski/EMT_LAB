import { Alert, Button, Card, CardContent, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import useAccommodation from "../hooks/useAccommodation";

const AccommodationDetailsPage = () => {
    const { id } = useParams();
    const accommodationId = id ? Number(id) : undefined;

    const { accommodation, loading, error } = useAccommodation(accommodationId);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!accommodation) {
        return <Alert severity="warning">Accommodation not found.</Alert>;
    }

    const hostName =
        accommodation.hostFullName ??
        accommodation.host?.fullName ??
        (accommodation.host?.surname
            ? `${accommodation.host.name} ${accommodation.host.surname}`
            : accommodation.host?.name) ??
        "N/A";

    const hostCountry =
        accommodation.hostCountry ??
        accommodation.host?.country?.name ??
        "N/A";

    return (
        <Stack spacing={3}>
            <Button component={RouterLink} to="/accommodations" variant="outlined">
                Back to accommodations
            </Button>

            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h4">
                            {accommodation.name}
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            <Chip label={accommodation.category} />
                            <Chip label={`${accommodation.numRooms} rooms`} />
                            {accommodation.condition && (
                                <Chip label={accommodation.condition} />
                            )}
                        </Stack>

                        <Typography variant="body1">
                            ID: {accommodation.id}
                        </Typography>

                        <Typography variant="body1">
                            Host: {hostName}
                        </Typography>

                        <Typography variant="body1">
                            Host country: {hostCountry}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default AccommodationDetailsPage;
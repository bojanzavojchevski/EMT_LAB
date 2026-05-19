import { Alert, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import useHost from "../hooks/useHost";

const HostDetailsPage = () => {
    const { id } = useParams();
    const hostId = id ? Number(id) : undefined;

    const { host, loading, error } = useHost(hostId);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!host) {
        return <Alert severity="warning">Host not found.</Alert>;
    }

    const hostName = host.fullName ?? `${host.name}${host.surname ? ` ${host.surname}` : ""}`;

    return (
        <Stack spacing={3}>
            <Button component={RouterLink} to="/hosts" variant="outlined">
                Back to hosts
            </Button>

            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {hostName}
                    </Typography>

                    <Typography variant="body1">
                        ID: {host.id}
                    </Typography>

                    <Typography variant="body1">
                        Name: {host.name}
                    </Typography>

                    {host.surname && (
                        <Typography variant="body1">
                            Surname: {host.surname}
                        </Typography>
                    )}

                    <Typography variant="body1">
                        Country: {host.country?.name ?? "N/A"}
                    </Typography>

                    <Typography variant="body1">
                        Continent: {host.country?.continent ?? "N/A"}
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default HostDetailsPage;
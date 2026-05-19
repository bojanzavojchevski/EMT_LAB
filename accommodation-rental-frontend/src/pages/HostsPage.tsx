import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import useHosts from "../hooks/useHosts";
import HostsList from "../components/host/HostsList";

const HostsPage = () => {
    const { hosts, loading, error } = useHosts();

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Stack spacing={3}>
            <Typography variant="h4">
                Hosts
            </Typography>

            <HostsList hosts={hosts} />
        </Stack>
    );
};

export default HostsPage;
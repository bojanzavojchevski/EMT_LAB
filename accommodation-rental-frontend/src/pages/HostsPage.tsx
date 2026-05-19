import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import tokenStorage from "../api/tokenStorage";
import useHosts from "../hooks/useHosts";
import useCountries from "../hooks/useCountries";
import HostsList from "../components/host/HostsList";
import HostFormDialog from "../components/host/HostFormDialog";
import type {
    CreateHostRequest,
    Host,
    UpdateHostRequest,
} from "../types/host";

const HostsPage = () => {
    const {
        hosts,
        loading: hostsLoading,
        error: hostsError,
        createHost,
        updateHost,
        deleteHost,
    } = useHosts();

    const {
        countries,
        loading: countriesLoading,
        error: countriesError,
    } = useCountries();

    const isAdmin = tokenStorage.isAdmin();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedHost, setSelectedHost] = useState<Host | null>(null);

    const handleAdd = () => {
        setSelectedHost(null);
        setDialogOpen(true);
    };

    const handleEdit = (host: Host) => {
        setSelectedHost(host);
        setDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this host?"
        );

        if (!confirmed) {
            return;
        }

        await deleteHost(id);
    };

    const handleSubmit = async (
        request: CreateHostRequest | UpdateHostRequest
    ) => {
        if (selectedHost) {
            await updateHost(selectedHost.id, request);
        } else {
            await createHost(request);
        }
    };

    if (hostsLoading || countriesLoading) {
        return <CircularProgress />;
    }

    if (hostsError || countriesError) {
        return (
            <Alert severity="error">
                {hostsError || countriesError}
            </Alert>
        );
    }

    return (
        <>
            <Stack spacing={3}>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4">
                        Hosts
                    </Typography>

                    {isAdmin && (
                        <Button variant="contained" onClick={handleAdd}>
                            Add Host
                        </Button>
                    )}
                </Stack>

                <HostsList
                    hosts={hosts}
                    canManage={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Stack>

            <HostFormDialog
                open={dialogOpen}
                host={selectedHost}
                countries={countries}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default HostsPage;
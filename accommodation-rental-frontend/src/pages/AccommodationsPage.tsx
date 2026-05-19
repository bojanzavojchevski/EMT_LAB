import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import tokenStorage from "../api/tokenStorage";
import useAccommodations from "../hooks/useAccommodations";
import useHosts from "../hooks/useHosts";
import AccommodationsList from "../components/accommodation/AccommodationsList";
import AccommodationFormDialog from "../components/accommodation/AccommodationFormDialog";
import type {
    Accommodation,
    CreateAccommodationRequest,
    UpdateAccommodationRequest,
} from "../types/accommodation";

const AccommodationsPage = () => {
    const {
        accommodations,
        loading: accommodationsLoading,
        error: accommodationsError,
        createAccommodation,
        updateAccommodation,
        deleteAccommodation,
    } = useAccommodations();

    const {
        hosts,
        loading: hostsLoading,
        error: hostsError,
    } = useHosts();

    const isAdmin = tokenStorage.isAdmin();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] =
        useState<Accommodation | null>(null);

    const handleAdd = () => {
        setSelectedAccommodation(null);
        setDialogOpen(true);
    };

    const handleEdit = (accommodation: Accommodation) => {
        setSelectedAccommodation(accommodation);
        setDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this accommodation?"
        );

        if (!confirmed) {
            return;
        }

        await deleteAccommodation(id);
    };

    const handleSubmit = async (
        request: CreateAccommodationRequest | UpdateAccommodationRequest
    ) => {
        if (selectedAccommodation) {
            await updateAccommodation(selectedAccommodation.id, request);
        } else {
            await createAccommodation(request);
        }
    };

    if (accommodationsLoading || hostsLoading) {
        return <CircularProgress />;
    }

    if (accommodationsError || hostsError) {
        return (
            <Alert severity="error">
                {accommodationsError || hostsError}
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
                        Accommodations
                    </Typography>

                    {isAdmin && (
                        <Button variant="contained" onClick={handleAdd}>
                            Add Accommodation
                        </Button>
                    )}
                </Stack>

                <AccommodationsList
                    accommodations={accommodations}
                    canManage={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Stack>

            <AccommodationFormDialog
                open={dialogOpen}
                accommodation={selectedAccommodation}
                hosts={hosts}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default AccommodationsPage;
import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import tokenStorage from "../api/tokenStorage";
import useCountries from "../hooks/useCountries";
import CountriesList from "../components/country/CountriesList";
import CountryFormDialog from "../components/country/CountryFormDialog";
import type {
    Country,
    CreateCountryRequest,
    UpdateCountryRequest,
} from "../types/country";

const CountriesPage = () => {
    const {
        countries,
        loading,
        error,
        createCountry,
        updateCountry,
        deleteCountry,
    } = useCountries();

    const isAdmin = tokenStorage.isAdmin();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleAdd = () => {
        setSelectedCountry(null);
        setDialogOpen(true);
    };

    const handleEdit = (country: Country) => {
        setSelectedCountry(country);
        setDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this country?"
        );

        if (!confirmed) {
            return;
        }

        await deleteCountry(id);
    };

    const handleSubmit = async (
        request: CreateCountryRequest | UpdateCountryRequest
    ) => {
        if (selectedCountry) {
            await updateCountry(selectedCountry.id, request);
        } else {
            await createCountry(request);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
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
                        Countries
                    </Typography>

                    {isAdmin && (
                        <Button variant="contained" onClick={handleAdd}>
                            Add Country
                        </Button>
                    )}
                </Stack>

                <CountriesList
                    countries={countries}
                    canManage={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Stack>

            <CountryFormDialog
                open={dialogOpen}
                country={selectedCountry}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default CountriesPage;
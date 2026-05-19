import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type {
    Country,
    CreateCountryRequest,
    UpdateCountryRequest,
} from "../../types/country";

interface CountryFormDialogProps {
    open: boolean;
    country?: Country | null;
    onClose: () => void;
    onSubmit: (request: CreateCountryRequest | UpdateCountryRequest) => Promise<void>;
}

const CountryFormDialog = ({
                               open,
                               country,
                               onClose,
                               onSubmit,
                           }: CountryFormDialogProps) => {
    const [name, setName] = useState("");
    const [continent, setContinent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const isEdit = !!country;

    useEffect(() => {
        if (country) {
            setName(country.name);
            setContinent(country.continent ?? "");
        } else {
            setName("");
            setContinent("");
        }
    }, [country, open]);

    const handleSubmit = async () => {
        if (!name.trim() || !continent.trim()) {
            return;
        }

        setSubmitting(true);

        try {
            await onSubmit({
                name: name.trim(),
                continent: continent.trim(),
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isEdit ? "Edit Country" : "Add Country"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Continent"
                        value={continent}
                        onChange={(event) => setContinent(event.target.value)}
                        fullWidth
                        required
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>
                    Cancel
                </Button>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={submitting || !name.trim() || !continent.trim()}
                >
                    {isEdit ? "Save" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CountryFormDialog;
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type {
    CreateHostRequest,
    Host,
    UpdateHostRequest,
} from "../../types/host";
import type { Country } from "../../types/country";

interface HostFormDialogProps {
    open: boolean;
    host?: Host | null;
    countries: Country[];
    onClose: () => void;
    onSubmit: (request: CreateHostRequest | UpdateHostRequest) => Promise<void>;
}

const HostFormDialog = ({
                            open,
                            host,
                            countries,
                            onClose,
                            onSubmit,
                        }: HostFormDialogProps) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [countryId, setCountryId] = useState<number | "">("");
    const [submitting, setSubmitting] = useState(false);

    const isEdit = !!host;

    useEffect(() => {
        if (host) {
            setName(host.name);
            setSurname(host.surname ?? "");
            setCountryId(host.country?.id ?? "");
        } else {
            setName("");
            setSurname("");
            setCountryId("");
        }
    }, [host, open]);

    const handleSubmit = async () => {
        if (!name.trim() || !surname.trim() || countryId === "") {
            return;
        }

        setSubmitting(true);

        try {
            await onSubmit({
                name: name.trim(),
                surname: surname.trim(),
                countryId: Number(countryId),
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isEdit ? "Edit Host" : "Add Host"}
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
                        label="Surname"
                        value={surname}
                        onChange={(event) => setSurname(event.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Country"
                        value={countryId}
                        onChange={(event) => setCountryId(Number(event.target.value))}
                        select
                        fullWidth
                        required
                    >
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>
                    Cancel
                </Button>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={
                        submitting ||
                        !name.trim() ||
                        !surname.trim() ||
                        countryId === ""
                    }
                >
                    {isEdit ? "Save" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HostFormDialog;
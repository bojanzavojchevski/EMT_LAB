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
    Accommodation,
    CreateAccommodationRequest,
    UpdateAccommodationRequest,
} from "../../types/accommodation";
import type { Host } from "../../types/host";

const accommodationCategories = [
    "ROOM",
    "HOUSE",
    "FLAT",
    "APARTMENT",
    "HOTEL",
    "MOTEL",
];

const accommodationConditions = [
    "GOOD",
    "BAD",
];

interface AccommodationFormDialogProps {
    open: boolean;
    accommodation?: Accommodation | null;
    hosts: Host[];
    onClose: () => void;
    onSubmit: (
        request: CreateAccommodationRequest | UpdateAccommodationRequest
    ) => Promise<void>;
}

const getInitialHostId = (accommodation: Accommodation | null | undefined) => {
    return accommodation?.host?.id ?? "";
};

const AccommodationFormDialog = ({
                                     open,
                                     accommodation,
                                     hosts,
                                     onClose,
                                     onSubmit,
                                 }: AccommodationFormDialogProps) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [hostId, setHostId] = useState<number | "">("");
    const [numRooms, setNumRooms] = useState("");
    const [condition, setCondition] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const isEdit = !!accommodation;

    useEffect(() => {
        if (accommodation) {
            setName(accommodation.name);
            setCategory(accommodation.category);
            setHostId(getInitialHostId(accommodation));
            setNumRooms(String(accommodation.numRooms));
            setCondition(accommodation.condition ?? "");
        } else {
            setName("");
            setCategory("");
            setHostId("");
            setNumRooms("");
            setCondition("");
        }
    }, [accommodation, open]);

    const isValid =
        !!name.trim() &&
        !!category &&
        hostId !== "" &&
        Number(numRooms) > 0 &&
        !!condition;

    const handleSubmit = async () => {
        if (!isValid) {
            return;
        }

        setSubmitting(true);

        try {
            await onSubmit({
                name: name.trim(),
                category,
                hostId: Number(hostId),
                numRooms: Number(numRooms),
                condition,
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isEdit ? "Edit Accommodation" : "Add Accommodation"}
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
                        label="Category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        select
                        fullWidth
                        required
                    >
                        {accommodationCategories.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Host"
                        value={hostId}
                        onChange={(event) => setHostId(Number(event.target.value))}
                        select
                        fullWidth
                        required
                    >
                        {hosts.map((host) => (
                            <MenuItem key={host.id} value={host.id}>
                                {host.fullName ??
                                    `${host.name} ${host.surname ?? ""}`.trim()}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Number of rooms"
                        type="number"
                        value={numRooms}
                        onChange={(event) => setNumRooms(event.target.value)}
                        fullWidth
                        required
                        slotProps={{
                            htmlInput: {
                                min: 1,
                            },
                        }}
                    />

                    <TextField
                        label="Condition"
                        value={condition}
                        onChange={(event) => setCondition(event.target.value)}
                        select
                        fullWidth
                        required
                    >
                        {accommodationConditions.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
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
                    disabled={submitting || !isValid}
                >
                    {isEdit ? "Save" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AccommodationFormDialog;
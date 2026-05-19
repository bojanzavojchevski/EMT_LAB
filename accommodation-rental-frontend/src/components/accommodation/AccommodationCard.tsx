import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Accommodation } from "../../types/accommodation";

interface AccommodationCardProps {
    accommodation: Accommodation;
    canManage: boolean;
    onEdit: (accommodation: Accommodation) => void;
    onDelete: (id: number) => void;
}

const getHostName = (accommodation: Accommodation) => {
    if (accommodation.hostFullName) {
        return accommodation.hostFullName;
    }

    if (accommodation.host?.fullName) {
        return accommodation.host.fullName;
    }

    if (accommodation.host?.surname) {
        return `${accommodation.host.name} ${accommodation.host.surname}`;
    }

    return accommodation.host?.name ?? "N/A";
};

const AccommodationCard = ({
                               accommodation,
                               canManage,
                               onEdit,
                               onDelete,
                           }: AccommodationCardProps) => {
    return (
        <Card>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h6">
                        {accommodation.name}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Chip label={accommodation.category} size="small" />
                        <Chip label={`${accommodation.numRooms} rooms`} size="small" />
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                        Host: {getHostName(accommodation)}
                    </Typography>

                    {accommodation.condition && (
                        <Typography variant="body2" color="text.secondary">
                            Condition: {accommodation.condition}
                        </Typography>
                    )}
                </Stack>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    component={RouterLink}
                    to={`/accommodations/${accommodation.id}`}
                >
                    Details
                </Button>

                {canManage && (
                    <>
                        <Button size="small" onClick={() => onEdit(accommodation)}>
                            Edit
                        </Button>

                        <Button
                            size="small"
                            color="error"
                            onClick={() => onDelete(accommodation.id)}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default AccommodationCard;
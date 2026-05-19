import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Host } from "../../types/host";

interface HostCardProps {
    host: Host;
}

const getHostName = (host: Host) => {
    if (host.fullName) {
        return host.fullName;
    }

    if (host.surname) {
        return `${host.name} ${host.surname}`;
    }

    return host.name;
};

const HostCard = ({ host }: HostCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    {getHostName(host)}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Country: {host.country?.name ?? "N/A"}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    component={RouterLink}
                    to={`/hosts/${host.id}`}
                >
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default HostCard;
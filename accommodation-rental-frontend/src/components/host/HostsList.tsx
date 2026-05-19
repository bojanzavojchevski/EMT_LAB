import { Box } from "@mui/material";
import type { Host } from "../../types/host";
import HostCard from "./HostCard";

interface HostsListProps {
    hosts: Host[];
}

const HostsList = ({ hosts }: HostsListProps) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 2,
            }}
        >
            {hosts.map((host) => (
                <HostCard key={host.id} host={host} />
            ))}
        </Box>
    );
};

export default HostsList;
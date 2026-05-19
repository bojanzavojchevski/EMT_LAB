import { Box } from "@mui/material";
import type { Host } from "../../types/host";
import HostCard from "./HostCard";

interface HostsListProps {
    hosts: Host[];
    canManage: boolean;
    onEdit: (host: Host) => void;
    onDelete: (id: number) => void;
}

const HostsList = ({
                       hosts,
                       canManage,
                       onEdit,
                       onDelete,
                   }: HostsListProps) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 2,
            }}
        >
            {hosts.map((host) => (
                <HostCard
                    key={host.id}
                    host={host}
                    canManage={canManage}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Box>
    );
};

export default HostsList;
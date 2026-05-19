import { Box } from "@mui/material";
import type { Accommodation } from "../../types/accommodation";
import AccommodationCard from "./AccommodationCard";

interface AccommodationsListProps {
    accommodations: Accommodation[];
    canManage: boolean;
    onEdit: (accommodation: Accommodation) => void;
    onDelete: (id: number) => void;
}

const AccommodationsList = ({
                                accommodations,
                                canManage,
                                onEdit,
                                onDelete,
                            }: AccommodationsListProps) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 2,
            }}
        >
            {accommodations.map((accommodation) => (
                <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                    canManage={canManage}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Box>
    );
};

export default AccommodationsList;
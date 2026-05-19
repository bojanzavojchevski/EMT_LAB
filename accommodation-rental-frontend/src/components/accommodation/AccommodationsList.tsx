import { Box } from "@mui/material";
import type { Accommodation } from "../../types/accommodation";
import AccommodationCard from "./AccommodationCard";

interface AccommodationsListProps {
    accommodations: Accommodation[];
}

const AccommodationsList = ({ accommodations }: AccommodationsListProps) => {
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
                />
            ))}
        </Box>
    );
};

export default AccommodationsList;
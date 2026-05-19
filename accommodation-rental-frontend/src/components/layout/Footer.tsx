import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 3, textAlign: "center", mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
                Accommodation Rental API UI - EMT Lab 3
            </Typography>
        </Box>
    );
};

export default Footer;
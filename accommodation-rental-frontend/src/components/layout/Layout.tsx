import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header />

            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>

            <Footer />
        </>
    );
};

export default Layout;
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import tokenStorage from "../../api/tokenStorage";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(
        tokenStorage.isAuthenticated()
    );

    useEffect(() => {
        setIsAuthenticated(tokenStorage.isAuthenticated());
    }, [location.pathname]);

    const handleLogout = () => {
        tokenStorage.removeToken();
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Accommodation Rental
                </Typography>

                <Button color="inherit" component={RouterLink} to="/">
                    Home
                </Button>

                <Button color="inherit" component={RouterLink} to="/accommodations">
                    Accommodations
                </Button>

                <Button color="inherit" component={RouterLink} to="/hosts">
                    Hosts
                </Button>

                <Button color="inherit" component={RouterLink} to="/countries">
                    Countries
                </Button>

                {!isAuthenticated && (
                    <>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>

                        <Button color="inherit" component={RouterLink} to="/register">
                            Register
                        </Button>
                    </>
                )}

                {isAuthenticated && (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
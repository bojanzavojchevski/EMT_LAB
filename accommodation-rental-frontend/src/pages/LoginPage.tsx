import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import authRepository from "../api/authRepository";
import tokenStorage from "../api/tokenStorage";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await authRepository.login({
                email,
                password,
            });

            tokenStorage.saveToken(response.token);
            tokenStorage.saveRole(response.role);
            navigate("/");
        } catch {
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <Card>
                <CardContent>
                    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
                        <Typography variant="h4">
                            Login
                        </Typography>

                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}

                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;
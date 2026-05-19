import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import authRepository from "../api/authRepository";
import tokenStorage from "../api/tokenStorage";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await authRepository.register({
                email,
                password,
                fullName,
            });

            tokenStorage.saveToken(response.token);
            navigate("/");
        } catch {
            setError("Registration failed. The email may already be in use.");
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
                            Register
                        </Typography>

                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}

                        <TextField
                            label="Full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            required
                            fullWidth
                        />

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
                            helperText="Password must be at least 6 characters."
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegisterPage;
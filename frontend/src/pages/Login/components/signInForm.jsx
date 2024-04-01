import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { InputAdornment, TextField, Stack, Card, Typography, Link, Box } from "@mui/material";
import Button from "@mui/joy/Button";
import { Person, VpnKey } from "@mui/icons-material";

const SignInForm = ({ setLogin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const submitSignInForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "An error occurred");
            }

            dispatch(setUser({ userData: data.userData }));
            localStorage.setItem("authToken", data.token);
            navigate("/home");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)', /* Sample gradient */
        }}>
            <Card sx={{
                minWidth: "25vw",
                minHeight: "60vh",
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.8)', /* Semi-transparent white */
            }}>
                <Stack spacing={4} alignItems="center">
                    <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                        Sign in
                    </Typography>
                    <Typography>
                        Don't have an account?&nbsp;
                        <Link onClick={() => setLogin(false)} underline="hover" sx={{ cursor: 'pointer', color: 'primary.main' }}>
                            Sign Up
                        </Link>
                    </Typography>
                    <form onSubmit={submitSignInForm} style={{ width: '100%' }}>
                        <Stack spacing={2} alignItems="center">
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={credentials.email}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKey />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button type="submit" sx={{ marginTop: 2, width: '100%', bgcolor: 'primary.main', ':hover': { bgcolor: 'primary.dark' } }}>
                                Sign In
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Card>
        </Box>
    );
};

export default SignInForm;

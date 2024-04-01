import React, { useState } from "react";
import { Input, Stack, Card, Typography, Link, Box } from "@mui/material";
import Button from "@mui/joy/Button";
import { Person, VpnKey, Email } from "@mui/icons-material";

const SignUpForm = ({ setLogin }) => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullname: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError(""); // Clear error message
        // Assume your API endpoint for user creation is /api/user
        try {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                    fullname: userData.fullname,
                    role: "user",
                }),
            });
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            alert("User created successfully!");
            setLogin(true);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Card sx={{
            minWidth: "25vw",
            minHeight: "60vh",
            backgroundColor: "#f5f5f5", // Example background color
            borderRadius: "16px", // Rounded corners
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)", // Box shadow for depth
        }}>
            <Stack spacing={3} sx={{ padding: "32px" }}>
                <Stack spacing={2}>
                    <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center" }}>
                        Sign Up
                    </Typography>
                    <Typography textAlign="center">
                        Already have an account?&nbsp;
                        <Link component="button" onClick={() => setLogin(true)} underline="always">
                            Sign In
                        </Link>
                    </Typography>
                </Stack>
                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Input
                            name="email"
                            startDecorator={<Email />}
                            placeholder="Email"
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Input
                            name="fullname"
                            startDecorator={<Person />}
                            placeholder="Full Name"
                            value={userData.fullname}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Input
                            name="password"
                            startDecorator={<VpnKey />}
                            placeholder="Password"
                            type="password"
                            value={userData.password}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Input
                            name="confirmPassword"
                            startDecorator={<VpnKey />}
                            placeholder="Confirm Password"
                            type="password"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button type="submit" sx={{ mt: 2 }}>Sign Up</Button>
                    </Stack>
                </form>
            </Stack>
        </Card>
    );
};

export default SignUpForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Stack, Card, Typography, Link } from "@mui/material";
import Button from "@mui/joy/Button";
import { Person, VpnKey } from "@mui/icons-material";

const SignInForm = ({ setLogin }) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const submitSignInForm = async (e) => {
        e.preventDefault(); // Ngăn chặn form từ việc submit theo cách truyền thống
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

            // Lưu token vào localStorage và điều hướng người dùng
            localStorage.setItem("authToken", data.token);
            navigate("/home");
        } catch (error) {
            alert(error.message); // Hiển thị thông báo lỗi
        }
    };

    return (
        <Card sx={{ minWidth: "25vw", minHeight: "60vh" }}>
            <Stack spacing={8}>
                <Stack>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Sign in
                    </Typography>
                    <Typography>
                        Don't have an account?&nbsp;
                        <Link onClick={() => setLogin(false)} underline="always">
                            Sign Up
                        </Link>
                    </Typography>
                </Stack>
                <form onSubmit={submitSignInForm}>
                    <Stack spacing={2}>
                        <Input
                            name="email"
                            startDecorator={<Person />}
                            placeholder="Email"
                            type="email"
                            value={credentials.email}
                            onChange={handleChange}
                        />
                        <Input
                            name="password"
                            startDecorator={<VpnKey />}
                            placeholder="Password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <Button type="submit">
                            Sign In
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Card>
    );
};

export default SignInForm;

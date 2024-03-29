import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Input, Stack, Card } from "@mui/joy";
import { Typography, Link } from "@mui/material";

import Button from "@mui/joy/Button";
import { Person, VpnKey } from "@mui/icons-material";

const SignInForm = ({ setLogin }) => {
    const navigation = useNavigate();

    const submitSignInForm = () => {
        navigation("/home");
    };

    return (
        <Card
            sx={{
                minWidth: "25vw",
                minHeight: "60vh",
            }}
        >
            <Stack spacing={8}>
                <Stack>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Sign in
                    </Typography>
                    <Typography>
                        Don't have an account?&nbsp;
                        <Link
                            onClick={() => setLogin(false)}
                            underline="always"
                        >
                            {"Sign Up"}
                        </Link>
                    </Typography>
                </Stack>
                <form>
                    <Stack spacing={2}>
                        <Input
                            startDecorator={<Person />}
                            placeholder="username"
                        ></Input>
                        <Input
                            startDecorator={<VpnKey />}
                            placeholder="password"
                            type="password"
                        ></Input>
                        <Button type="submit" onClick={submitSignInForm}>
                            Sign In
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Card>
    );
};

export default SignInForm;

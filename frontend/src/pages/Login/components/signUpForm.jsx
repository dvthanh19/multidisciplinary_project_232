import React from "react";

import { Input, Stack, Card } from "@mui/joy";
import { Typography, Link } from "@mui/material";

import Button from "@mui/joy/Button";
import { Person, VpnKey } from "@mui/icons-material";

const SignUpForm = ({setLogin}) => {
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
                        Sign up
                    </Typography>
                    <Typography>
                        Already have an account?&nbsp;
                        <Link onClick={() => setLogin(true)} underline="always">
                            {"Sign In"}
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
                        <Input
                            startDecorator={<VpnKey />}
                            placeholder="confirm password"
                            type="password"
                        ></Input>
                        <Button type="submit">Sign Up</Button>
                    </Stack>
                </form>
            </Stack>
        </Card>
    );
};

export default SignUpForm;
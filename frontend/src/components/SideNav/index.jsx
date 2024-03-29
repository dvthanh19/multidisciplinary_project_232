import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import { Avatar, IconButton } from "@mui/joy";
import { ListItemContent } from "@mui/joy";
import { useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/joy";

import routes from "appRoutes";

const SideNav = ({ focusOnRouteID }) => {
    const navigate = useNavigate();

    const submitSignOut = () => {
        navigate("/portal");
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "left",
                gap: 2,
                flexWrap: "wrap",
                "& > *": { minWidth: 0, flexBasis: 200 },
                width: 250,
                height: 700,
                position: "fixed",
            }}
        >
            <List
                size="md"
                variant="soft"
                sx={{
                    borderRadius: "16px",
                    p: 1,
                    pt: 2,
                    "--ListItemDecorator-size": "56px",
                }}
            >
                <ListItem>
                    <ListItemDecorator>
                        <Avatar sx={{ bgcolor: "neutral.softColor" }} />
                    </ListItemDecorator>
                    <ListItemContent>
                        <Typography level="title-md" noWrap>
                            User 101
                        </Typography>
                        <Typography level="body-sm">Student</Typography>
                    </ListItemContent>
                    <IconButton
                        onClick={submitSignOut}
                        sx={{ color: "neutral.solidBg" }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </ListItem>

                <Divider orientation="horizontal" sx={{ my: 3 }} />

                {routes.map((route) => (
                    <ListItem>
                        <ListItemButton selected={focusOnRouteID == route.key}>
                            <ListItemDecorator
                                sx={{ color: "neutral.solidBg" }}
                            >
                                {route.icon}
                            </ListItemDecorator>
                            {route.name}
                        </ListItemButton>
                    </ListItem>
                ))}

                {/* <ListItem>
                    <ListItemButton selected={focusIndex == 0}>
                        <ListItemDecorator sx={{ color: "neutral.solidBg" }}>
                            <SpaceDashboardIcon />
                        </ListItemDecorator>
                        Home
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton selected={focusIndex == 1}>
                        <ListItemDecorator sx={{ color: "neutral.solidBg" }}>
                            <RouterIcon />
                        </ListItemDecorator>
                        Devices
                    </ListItemButton>
                </ListItem> */}
            </List>
        </Box>
    );
};

export default SideNav;

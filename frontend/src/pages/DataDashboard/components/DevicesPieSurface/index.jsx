import React, { useState, useEffect } from "react";
import {
    Card,
    Stack,
    Typography,
    Box,
    IconButton,
    Chip,
    Tooltip,
    Dropdown,
    MenuButton,
    Menu,
    MenuItem,
} from "@mui/joy";

import axios from "axios";

import { Subject, DataObject, FileDownload } from "@mui/icons-material";

import "chart.js/auto";

import exportCSV from "utils/exportCSV";
import exportJSON from "utils/exportJSON";
import { Doughnut } from "react-chartjs-2";

const DevicesPieSurface = () => {
    const [logData, setLogData] = useState();
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchAllDevices = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/device/",
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                const data = await response.data;
                setLogData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (authToken) {
            fetchAllDevices();
        }
    }, []);

    console.log(logData);

    const data = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <Card
            size="lg"
            variant="soft"
            color="primary"
            sx={{
                minWidth: 400,
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Stack direction="column" spacing={4}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <Box maxWidth={300}>
                        <Typography level="h3" noWrap>
                            Devices Type
                        </Typography>
                    </Box>
                </Stack>
                <Stack>
                    <Stack direction="row">
                        <Dropdown>
                            {/* Download (Export) from the frontend */}
                            <Tooltip title="Export">
                                <MenuButton slots={{ root: IconButton }}>
                                    <FileDownload />
                                </MenuButton>
                            </Tooltip>
                            <Menu>
                                <MenuItem onClick={() => exportCSV(logData)}>
                                    Export as CSV <Subject />
                                </MenuItem>
                                <MenuItem onClick={() => exportJSON(logData)}>
                                    Export as JSON <DataObject />
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    </Stack>

                    <Doughnut data={data} />
                </Stack>
            </Stack>
        </Card>
    );
};

export default DevicesPieSurface;

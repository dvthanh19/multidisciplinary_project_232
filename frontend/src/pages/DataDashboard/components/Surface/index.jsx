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

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import "chart.js/auto";

const Surface = ({ name, dataComponent }) => {
    return (
        <Card
            size="lg"
            variant="soft"
            color="primary"
            sx={{
                minWidth: 400,
                minHeight: 300,
                maxHeight: 300,
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
                            {name}
                        </Typography>
                    </Box>
                </Stack>
                <Stack>
                    <Stack direction="row">
                        <Tooltip title="Filter">
                            <IconButton size="sm">
                                <FilterAltIcon />
                            </IconButton>
                        </Tooltip>
                        <Dropdown>
                            <Tooltip title="Export">
                                <MenuButton slots={{ root: IconButton }}>
                                    <FileDownloadIcon />
                                </MenuButton>
                            </Tooltip>
                            <Menu>
                                <MenuItem>Export as CSV</MenuItem>
                                <MenuItem>Export as JSON</MenuItem>
                            </Menu>
                        </Dropdown>
                    </Stack>
                    {dataComponent}
                </Stack>
            </Stack>
        </Card>
    );
};

export default Surface;

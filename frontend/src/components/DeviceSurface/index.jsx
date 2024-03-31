import { useState } from "react";

import { Card, Stack, Typography, Box, IconButton } from "@mui/joy";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SettingsIcon from "@mui/icons-material/Settings";

const DeviceSurface = ({
    deviceName, // Name of device to be displayed
    deviceLocation, // Location of the device to be displayed
    addNumberActiveDevicesHook,  // Hook to increase the number of Active devices (used in DeviceList)
}) => {
    const [deviceOn, setDeviceOn] = useState(true);

    return (
        <Card
            size="lg"
            variant="soft"
            color={deviceOn ? "primary" : "success"}
            sx={{
                minWidth: 400,
                minHeight: 300,
                maxHeight: 300,
            }}
        >
            <Stack direction="column" spacing={4}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <IconButton
                        size="lg"
                        variant="solid"
                        color={deviceOn ? "success" : "danger"}
                        onClick={() => {
                            setDeviceOn(!deviceOn);

                            addNumberActiveDevicesHook(deviceOn ? -1 : 1);
                        }}
                    >
                        <PowerSettingsNewIcon />
                    </IconButton>

                    <Box maxWidth={300}>
                        <Typography level="h3" noWrap>
                            {deviceName}
                        </Typography>
                        <Typography
                            level="body-sm"
                            startDecorator={<LocationOnIcon />}
                            noWrap
                        >
                            {deviceLocation}
                        </Typography>
                    </Box>
                </Stack>
                <Stack spacing={0} direction="column">
                    <Box>
                        <Stack
                            direction="row"
                            spacing={0}
                            justifyContent="flex-start"
                        >
                            <Box>
                                <IconButton size="sm" disabled>
                                    <SettingsIcon />
                                </IconButton>
                                <IconButton size="sm" disabled>
                                    <DocumentScannerIcon />
                                </IconButton>
                                <IconButton size="sm" disabled>
                                    <MoreHorizIcon />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Box>
                    <Box
                        id="ContentBox"
                        sx={{ height: 180, overflow: "scroll" }}
                    >
                        <Card sx={{ height: 356 }}>Embed any graph here</Card>
                    </Box>
                </Stack>
            </Stack>
        </Card>
    );
};

export default DeviceSurface;

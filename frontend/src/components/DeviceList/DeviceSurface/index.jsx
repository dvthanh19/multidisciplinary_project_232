import { useState } from "react";

import { Card, Stack, Typography, Box, IconButton, Chip } from "@mui/joy";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SettingsIcon from "@mui/icons-material/Settings";
import { Edit } from "@mui/icons-material";

const DeviceSurface = ({
    deviceName, // Name of device to be displayed
    deviceLocation, // Location of the device to be displayed
    addNumberActiveDevicesHook, // Hook to increase the number of Active devices (used in DeviceList)
    deviceTagIcon, // Icon for the chip tag next to deviceName
    deviceTagName, // Name of the chip tag next to deviceLocation
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
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Box maxWidth={300}>
                                {/* <Typography endDecorator={deviceIcon} level="h3" noWrap> */}
                                <Typography
                                    endDecorator={
                                        <Chip
                                            variant="soft"
                                            endDecorator={deviceTagIcon}
                                            size="lg"
                                        >
                                            {deviceTagName}
                                        </Chip>
                                    }
                                    level="h3"
                                    noWrap
                                >
                                    {deviceName}
                                </Typography>
                                <Typography level="body-sm" noWrap>
                                    {deviceLocation}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

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
                                    <Edit />
                                </IconButton>
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
                        <Card sx={{ height: 356 }}>
                            Embed any Device Control here
                        </Card>
                    </Box>
                </Stack>
            </Stack>
        </Card>
    );
};

export default DeviceSurface;

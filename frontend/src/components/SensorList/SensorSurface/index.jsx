import { useState } from "react";

import {
    Card,
    Stack,
    Typography,
    Box,
    IconButton,
    Chip,
    Tooltip,
    Button,
} from "@mui/joy";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SettingsIcon from "@mui/icons-material/Settings";
import SensorsIcon from "@mui/icons-material/Sensors";
import { Edit } from "@mui/icons-material";

const SensorSurface = ({
    sensorName, // Name of device to be displayed
    sensorLocation, // Location of the device to be displayed
    sensorTagIcon, // Icon for the chip tag next to sensorName
    sensorTagName, // Name of the chip tag next to sensorLocation
    sensorStatus, // connection status, could be true or false
}) => {
    const [deviceOn, setDeviceOn] = useState(true);

    return (
        <Card
            size="lg"
            variant="soft"
            color={deviceOn ? "primary" : "success"}
            sx={{
                minWidth: 400,
                minHeight: 400,
                maxHeight: 400,
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
                                    level="h3"
                                    endDecorator={
                                        <Chip
                                            variant="soft"
                                            endDecorator={sensorTagIcon}
                                            size="lg"
                                        >
                                            {sensorTagName}
                                        </Chip>
                                    }
                                    noWrap
                                >
                                    {sensorName}
                                </Typography>
                                <Typography level="body-sm" noWrap>
                                    {sensorLocation}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <Tooltip
                            title={
                                sensorStatus
                                    ? "Connection is OK."
                                    : "Sensor disconnected..."
                            }
                        >
                            <IconButton
                                variant="plain"
                                color={sensorStatus ? "success" : "danger"}
                            >
                                <SensorsIcon />
                            </IconButton>
                        </Tooltip>
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
                        <Card sx={{ height: 356 }}>Embed any Graph</Card>
                    </Box>
                </Stack>
            </Stack>
        </Card>
    );
};

export default SensorSurface;

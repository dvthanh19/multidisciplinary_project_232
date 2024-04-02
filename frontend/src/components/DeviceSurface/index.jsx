import React, { useState, useEffect } from "react";
import { Card, Stack, Typography, Box, IconButton, Chip } from "@mui/joy";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import DeviceDetailModal from "components/DetailDevice/DeviceDetailModal";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const DeviceSurface = ({ id, deviceID, name, type, position }) => {
    const [deviceOn, setDeviceOn] = useState(true);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [logData, setLogData] = useState([]);
    const ADAFRUIT_IO_USERNAME = "1zy";
    const ADAFRUIT_IO_KEY = "aio_HQHl865UcZU9BnFNjemUKCfwh7Vx";

    const handleOpenDetailModal = () => {
        setOpenDetailModal(true);
    };

    useEffect(() => {
        const fetchLogData = async () => {
            const response = await fetch(
                `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${deviceID}/data`,
                {
                    headers: {
                        "X-AIO-Key": ADAFRUIT_IO_KEY,
                    },
                }
            );
            const data = await response.json();
            setLogData(data);
        };

        fetchLogData();
    }, [name]);

    const data = {
        labels: logData.map((log) =>
            new Date(log.created_at).toLocaleTimeString()
        ),
        datasets: [
            {
                label: "Value",
                data: logData.map((log) => log.value),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <Card
            size="lg"
            variant="soft"
            color={deviceOn ? "primary" : "success"}
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
                    <IconButton
                        size="lg"
                        variant="solid"
                        color={deviceOn ? "success" : "danger"}
                        onClick={() => setDeviceOn(!deviceOn)}
                    >
                        <PowerSettingsNewIcon />
                    </IconButton>
                    <Box maxWidth={300}>
                        <Typography
                            level="h3"
                            endDecorator={
                                <Chip color="success" variant="soft">
                                    {type}
                                </Chip>
                            }
                            noWrap
                        >
                            {name}
                        </Typography>
                        <Typography
                            level="body-sm"
                            startDecorator={<LocationOnIcon />}
                            noWrap
                        >
                            {position}
                        </Typography>
                    </Box>
                    <IconButton
                        size="lg"
                        variant="solid"
                        color="primary"
                        onClick={handleOpenDetailModal}
                    >
                        <InfoIcon />
                    </IconButton>
                </Stack>
                {/* Graph */}
                <Line data={data} />
            </Stack>
            <DeviceDetailModal
                open={openDetailModal}
                onClose={() => setOpenDetailModal(false)}
                deviceId={id}
            />
        </Card>
    );
};

export default DeviceSurface;

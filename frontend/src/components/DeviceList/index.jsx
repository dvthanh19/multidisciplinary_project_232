import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Chip, Box, Typography } from "@mui/joy";
import DoneIcon from "@mui/icons-material/Done";
import SensorsOffIcon from "@mui/icons-material/SensorsOff";
import DeviceSurface from "components/DeviceSurface";

const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [numberOfDevice, setNumberOfDevices] = useState(0);
    const [numberOfSensor, setNumberOfSensors] = useState(0);
    const [activeDevices, setActiveDevices] = useState(0);
    const [activeSensors, setActiveSensors] = useState(0);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/device/"
                );
                setDevices(response.data.device);
                // Assuming active is determined by curValue presence
                setActiveDevices(
                    response.data.device.filter(
                        (device) => device.curValue && device.type === "Device"
                    ).length
                );
                setNumberOfDevices(
                    response.data.device.filter(
                        (device) => device.type === "Device"
                    ).length
                );
                setNumberOfSensors(
                    response.data.device.filter(
                        (device) => device.type === "Sensor"
                    ).length
                );
                setActiveSensors(
                    response.data.device.filter(
                        (device) => device.curValue && device.type === "Sensor"
                    ).length
                );
            } catch (error) {
                console.error("Failed to fetch devices:", error);
            }
        };

        fetchDevices();
    }, []);

    // Warning:
    // Putting both DeviceList and SensorList in one component can be difficult
    // to ensure consistency over future components in IotDashboard.
    //
    // Needs future refactor.
    return (
        <Stack spacing={6} direction="column">
            <Stack spacing={1} direction="column">
                <Stack spacing={1} direction="row">
                    <Typography sx={{ color: "neutral.500" }}>
                        Available sensors
                    </Typography>
                    <Chip
                        variant="outlined"
                        color="success"
                        startDecorator={<DoneIcon />}
                    >
                        Active {activeSensors}
                    </Chip>
                    <Chip
                        variant="outlined"
                        color="danger"
                        startDecorator={<SensorsOffIcon />}
                    >
                        Unactive {numberOfSensor - activeSensors}
                    </Chip>
                </Stack>
                <Stack
                    spacing={2}
                    direction="row"
                    flexWrap="nowrap"
                    sx={{ overflow: "auto" }}
                >
                    {devices
                        .filter((device) => device.type === "Sensor")
                        .map((device) => (
                            <DeviceSurface
                                id={device._id}
                                deviceID={device.deviceID}
                                name={device.name}
                                type={device.type}
                                position={device.position}
                            />
                        ))}
                </Stack>
            </Stack>

            <Stack spacing={1} direction="column">
                <Stack spacing={1} direction="row">
                    <Typography sx={{ color: "neutral.500" }}>
                        Available devices
                    </Typography>
                    <Chip
                        variant="outlined"
                        color="success"
                        startDecorator={<DoneIcon />}
                    >
                        Active {activeDevices}
                    </Chip>
                    <Chip
                        variant="outlined"
                        color="danger"
                        startDecorator={<SensorsOffIcon />}
                    >
                        Unactive {numberOfDevice - activeDevices}
                    </Chip>
                </Stack>
                <Stack
                    spacing={2}
                    direction="row"
                    flexWrap="nowrap"
                    sx={{ overflow: "auto" }}
                >
                    {devices
                        .filter((device) => device.type === "Device")
                        .map((device) => (
                            <DeviceSurface
                                id={device._id}
                                deviceID={device.deviceID}
                                name={device.name}
                                type={device.type}
                                position={device.position}
                            />
                        ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default DeviceList;

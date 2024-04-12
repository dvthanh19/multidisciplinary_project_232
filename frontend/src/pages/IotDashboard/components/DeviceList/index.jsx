import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Chip, Box, Typography, CircularProgress, Grid } from "@mui/joy";
import { Pagination, Fade } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SensorsOffIcon from "@mui/icons-material/SensorsOff";
import DeviceSurface from "../DeviceSurface";

const devicesPerPage = 2;

const groupDevicesToPages = (devices, devicesPerPage = 2) => {
    // devices as object
    // devicesPerPage is an integer
    return devices.reduce((acc, element, index) => {
        const currentGroup = Math.floor(index / devicesPerPage);
        if (!acc[currentGroup]) {
            acc[currentGroup] = [];
        }
        acc[currentGroup].push(element);
        return acc;
    }, {});
};

const filterDeviceTypes = (devices, type) => {
    return devices.filter((device) => device.type === type);
};

const LoadingList = () => {
    return (
        <Stack
            p={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
        >
            <Stack direction="column">
                <Typography align="center">
                    <CircularProgress size="lg" />
                </Typography>
                <Typography>Your devices are being prepared...</Typography>
            </Stack>
        </Stack>
    );
};

const DeviceList = ({ type }) => {
    // deviceType can be {"Device", "Sensor", ...}
    const [devices, setDevices] = useState([]);
    const [numberOfDevice, setNumberOfDevices] = useState(0);
    const [itemGroups, setItemGroups] = useState({});
    const [activeDevices, setActiveDevices] = useState(0);
    const [page, setPage] = useState(1);
    const [triggerFadeAnimation, setFadeAnimation] = useState(true);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/device/"
                );
                const devices = filterDeviceTypes(response.data.device, type);

                // Assuming active is determined by curValue presence
                setDevices(filterDeviceTypes(devices, type));
                setActiveDevices(
                    devices.filter((device) => device.curValue).length
                );
                setNumberOfDevices(devices.length);
                setItemGroups(groupDevicesToPages(devices, devicesPerPage));
            } catch (error) {
                console.error("Failed to fetch devices:", error);
            }
        };

        fetchDevices();
        localStorage.setItem("itemGroups", itemGroups);
    }, []);

    useEffect(() => {}, [page]);

    return (
        <Stack spacing={6} direction="column">
            <Stack spacing={1} direction="column">
                <Stack spacing={1} direction="row">
                    <Typography sx={{ color: "neutral.500" }}>
                        Available {type}s
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

                {Object.keys(itemGroups).length > 0 ? (
                    <Stack
                        spacing={2}
                        direction="row"
                        flexWrap="nowrap"
                        sx={{ overflow: "auto" }}
                    >
                        {itemGroups[page - 1]
                            .filter((device) => device.type === type)
                            .map((device, idx) => (
                                <Grid xs={6}>
                                    <DeviceSurface
                                        id={device._id}
                                        deviceID={device.deviceID}
                                        name={device.name}
                                        type={device.type}
                                        position={device.position}
                                    />
                                </Grid>
                            ))}
                    </Stack>
                ) : (
                    <LoadingList />
                )}

                <Pagination
                    page={page}
                    count={Object.keys(itemGroups).length}
                    color="primary"
                    boundaryCount={1}
                    siblingCount={0}
                    onChange={(event, page) => setPage(page)}
                />
            </Stack>
        </Stack>
    );
};

export default DeviceList;

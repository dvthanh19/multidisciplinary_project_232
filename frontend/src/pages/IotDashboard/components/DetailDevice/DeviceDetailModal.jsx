import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import {
    Typography,
    Chip,
    IconButton,
    CircularProgress,
    Stack,
    Box,
    Grid,
    Card,
    Button,
    Dropdown,
    Select,
    Option,
    Input,
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import DeviceSettingsModalContext from "pages/IotDashboard/contexts/DeviceSettings";

const DialogHeader = ({ deviceDetail }) => {
    const setModalObject = useContext(DeviceSettingsModalContext);
    return (
        <DialogTitle>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography
                    level="h1"
                    endDecorator={
                        <IconButton color="neutral">
                            <EditIcon />
                        </IconButton>
                    }
                >
                    {deviceDetail.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        startDecorator={<DoneIcon />}
                        color="primary"
                        size="sm"
                        onClick={() => {
                            alert("New changes applied! (Just kidding)")
                            setModalObject({});
                        }}
                    >
                        Apply
                    </Button>
                    <IconButton
                        color="danger"
                        size="sm"
                        onClick={() => {
                            setModalObject({});
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </Stack>
            <Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip color="success" variant="soft">
                        {deviceDetail.type}
                    </Chip>
                    <Chip>
                        <Typography startDecorator={<LocationOnIcon />}>
                            {deviceDetail.position}
                        </Typography>
                    </Chip>
                </Stack>
            </Typography>
        </DialogTitle>
    );
};

const GeneralInfo = ({ deviceDetail }) => {
    return (
        <Stack direction="column">
            <Typography>
                Last Value: {deviceDetail.curValue.lastValue}
            </Typography>
            <Typography>
                Last Updated At:{" "}
                {new Date(deviceDetail.curValue.updatedAt).toLocaleString()}
            </Typography>
        </Stack>
    );
};

const ThresholdActionSection = () => {
    return (
        <Stack direction="column">
            <Typography level="h3">Threshold action</Typography>
            <Card>
                <Stack direction="row" justifyContent="space-between">
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Typography>Trigger </Typography>
                        <Select
                            placeholder="Select an action"
                            name="foo"
                            required
                            sx={{ minWidth: 200 }}
                            defaultValue="a"
                            onChange={() => {}}
                        >
                            <Option value="a">Action A</Option>
                            <Option value="b">Action B</Option>
                            <Option value="c">Action C</Option>
                        </Select>
                        <Typography> on value </Typography>
                        <Input
                            sx={{ width: 100 }}
                            placeholder="value..."
                            type="number"
                        ></Input>
                    </Stack>
                    <Button startDecorator={<AddIcon />} size="sm">
                        New Action
                    </Button>
                </Stack>
            </Card>
            <Card sx={{ bgcolor: "yellow" }}>
                A list to display current Threshold Actions
            </Card>
        </Stack>
    );
};

const ScheduleSection = () => {
    return (
        <Stack direction="column">
            <Typography level="h3">Schedule</Typography>
            <Card>
                <Stack direction="row" justifyContent="space-between">
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Typography>Keep{" "}</Typography>
                        <Select
                            placeholder="Select an action"
                            name="foo"
                            required
                            sx={{ minWidth: 200 }}
                            defaultValue="a"
                            onChange={() => {}}
                        >
                            <Option value="a">Action A</Option>
                            <Option value="b">Action B</Option>
                            <Option value="c">Action C</Option>
                        </Select>
                        <Typography>{" "}from{" "}</Typography>
                        <Input type="time"></Input>
                        <Typography>{" "}to{" "}</Typography>
                        <Input type="time"></Input>
                    </Stack>
                    <Button startDecorator={<AddIcon />} size="sm">
                        New Schedule
                    </Button>
                </Stack>
            </Card>
            <Card sx={{ bgcolor: "yellow" }}>
                A list to display current Schedules
            </Card>
        </Stack>
    );
};

const DeviceDetailModal = ({ deviceId }) => {
    const [deviceDetail, setDeviceDetail] = useState(0);

    useEffect(() => {
        const fetchDeviceDetail = async () => {
            try {
                console.log("fetching device detail", deviceId);
                const response = await axios.get(
                    `http://localhost:3000/api/device/${deviceId}`
                );

                console.log(response);
                setDeviceDetail(response.data.device);
            } catch (error) {
                console.error("Failed to fetch device details:", error);
            }
        };

        fetchDeviceDetail();
    }, [deviceId]);

    return (
        <Card>
            {deviceDetail ? (
                <Box>
                    <DialogHeader deviceDetail={deviceDetail} />
                    <DialogContent>
                        {/* Displaying the last value and its update time from curValue */}
                        <Stack direction="column" spacing={4}>
                            <GeneralInfo deviceDetail={deviceDetail} />
                            <ThresholdActionSection />
                            <ScheduleSection />
                        </Stack>
                    </DialogContent>
                </Box>
            ) : (
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ m: 6 }}
                >
                    <CircularProgress variant="solid" />
                    <Typography level="body-lg">
                        Your device is being prepared...
                    </Typography>
                </Stack>
            )}
        </Card>
    );
};

export default DeviceDetailModal;

import React, { useEffect, useState, useContext, useRef } from "react";
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
    Slider,
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar, Alert } from '@mui/material';

import DeviceSettingsModalContext from "../contexts/DeviceSettings";


const DialogHeader = ({ deviceDetail, onSave }) => {
    const setModalObject = useContext(DeviceSettingsModalContext);
    return (
        <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography level="h1" endDecorator={<IconButton color="neutral"><EditIcon /></IconButton>}>
                    {deviceDetail.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button startDecorator={<DoneIcon />} color="primary" size="sm" onClick={onSave}>
                        Apply
                    </Button>
                    <IconButton color="danger" size="sm" onClick={() => setModalObject({})}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </Stack>
            <Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip color="success" variant="soft">{deviceDetail.type}</Chip>
                    <Chip><Typography startDecorator={<LocationOnIcon />}>{deviceDetail.position}</Typography></Chip>
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

const SliderControl = () => {
    const ItensitySlider = ({labelName, minValue, maxValue}) => {
        return (
            <Card>
                <Typography level="title-sm">{labelName}</Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                >
                    <Typography>{minValue}</Typography>
                    <Slider
                        defaultValue={50}
                        valueLabelDisplay="on"
                        step={(maxValue-minValue)/0.5}
                        marks
                    />
                    <Typography>{maxValue}</Typography>
                </Stack>
            </Card>
        );
    };

    return (
        <Stack direction="column" spacing={1}>
            <Typography level="h3">Control</Typography>
            <Grid xs={5}>
                <ItensitySlider labelName="Itensity" minValue={0} maxValue={10}/>
            </Grid>
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
                        <Typography>Keep </Typography>
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
                        <Typography> from </Typography>
                        <Input type="time"></Input>
                        <Typography> to </Typography>
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
    const [sliderValue, setSliderValue] = useState(50); // Default value set to 50 for demonstration
    const deviceDetailRef = useRef(deviceDetail); 
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        deviceDetailRef.current = deviceDetail; // Update ref whenever deviceDetail changes
    }, [deviceDetail]);
    
    useEffect(() => {
        const fetchDeviceDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/device/${deviceId}`);
                console.log("Fetched device details:", response.data.device);
                setDeviceDetail(response.data.device);
            } catch (error) {
                console.error("Failed to fetch device details:", error);
            }
        };
    
        fetchDeviceDetail();
    }, [deviceId]);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const saveChanges = async () => {
        const detail = deviceDetailRef.current; // Use ref to access current device details
        console.log("Saving changes for device:", detail);
      

        const ADAFRUIT_IO_USERNAME = "1zy"; // Use the actual username
        const ADAFRUIT_IO_KEY = "aio_HQHl865UcZU9BnFNjemUKCfwh7Vx"; // Use the actual key
        const relevantIds = ["led", "fan"];

        try {
            for (const idPart of relevantIds) {
                if (detail.deviceID.toLowerCase().includes(idPart)) {
                    const url = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${detail.deviceID }/data`;
                    const response = await axios.post(url, { value: sliderValue.toString() }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AIO-Key': ADAFRUIT_IO_KEY,
                        }
                    });
                    console.log("Posted device data successfully:", response.data);
                    setSnackbarMessage('Changes applied successfully!');
                    setOpenSnackbar(true);  
                }
            }
        } catch (error) {
            console.error("Failed to post device data:", error);
        }
    };
    return (
        <Card>
            {deviceDetail ? (
                <Box>
                    <DialogHeader deviceDetail={deviceDetail} onSave={saveChanges} />
                    <DialogContent>
                        <Stack direction="column" spacing={4}>
                            <GeneralInfo deviceDetail={deviceDetail} />
                            <SliderControl sliderValue={sliderValue} onSliderChange={handleSliderChange} />
                            <ThresholdActionSection />
                            <ScheduleSection />
                        </Stack>
                    </DialogContent>
                </Box>
            ) : (
                <Stack direction="column" alignItems="center" justifyContent="center" sx={{ m: 6 }}>
                    <CircularProgress variant="solid" />
                    <Typography level="body-lg">Your device is being prepared...</Typography>
                </Stack>
            )}
         <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
        </Card>
    );
};



export default DeviceDetailModal;

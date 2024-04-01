import { Stack, Typography, Chip, Box } from "@mui/joy";

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

import SensorSurface from "components/SensorList/SensorSurface"
import { useState } from "react";

const SensorList = (deviceList = []) => {
    // Insist deviceList to be a dictionary like this:
    /**
     * [
     *  {
     *      deviceName: "",
     *      deviceLocation: ""
     *  },
     *  {},
     *  {},
     *  {},
     * ]
     */
    deviceList = [{ a: "a" }, { a: "a" }, { a: "a" }, { a: "a" }, { a: "a" }]; // Just for demo

    // For displaying active devices/unactive devices Chips.
    const numberOfDevices = deviceList.length;
    const [numberActiveDevices, setActiveDevices] = useState(numberOfDevices);
    const addActiveDevices = (adder) => {
        setActiveDevices(numberActiveDevices + adder);
    };

    return (
        <Stack spacing={1} direction="column">
            <Stack spacing={1} direction="row">
                <Typography sx={{ color: "neutral.500" }}>
                    Available sensors
                </Typography>
            </Stack>
            <Typography
                level="title-md"
                noWrap={false}
                variant="plain"
                sx={{ px: 2 }}
            ></Typography>
            <Stack
                spacing={2}
                direction="row"
                flexWrap="nowrap"
                sx={{ overflow: "auto" }}
            >
                {/* Just for demo */}
                {Array.from(Array(numberOfDevices)).map((_, index) => (
                    <SensorSurface
                        sensorName={`Sensor 10${index}`}
                        sensorLocation="268, Ly Thuong kiet, Dist 10"
                        sensorTagIcon={<DeviceThermostatIcon/>}
                        sensorTagName="Temperature"
                        sensorStatus={true}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default SensorList;

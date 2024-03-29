import { Stack, Typography, Chip, Box } from "@mui/joy";

import DoneIcon from "@mui/icons-material/Done";
import SensorsOffIcon from "@mui/icons-material/SensorsOff";

import DeviceSurface from "components/DeviceSurface";
import { useState } from "react";

const DeviceList = (deviceList = []) => {
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
                    Available devices
                </Typography>
                <Chip
                    variant="outlined"
                    color="success"
                    startDecorator={<DoneIcon />}
                >
                    Active {numberActiveDevices}
                </Chip>
                <Chip
                    variant="outlined"
                    color="danger"
                    startDecorator={<SensorsOffIcon />}
                >
                    Unactive {numberOfDevices - numberActiveDevices}
                </Chip>
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
                    <DeviceSurface
                        deviceName={`Device 10${index}`}
                        deviceLocation="268, Ly Thuong kiet, Dist 10"
                        addNumberActiveDevicesHook={addActiveDevices}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default DeviceList;

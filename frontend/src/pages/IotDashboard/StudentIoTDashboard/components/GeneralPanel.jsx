import { Box, Card, Chip, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

import { Event } from "@mui/icons-material";

const ClockCard = () => {
    const Realtime = () => {
        const getCurrentTime = () => {
            const dateObject = new Date();

            const hour = String(dateObject.getHours()).padStart(2, "0");
            const minute = String(dateObject.getMinutes()).padStart(2, "0");
            const second = String(dateObject.getSeconds()).padStart(2, "0");

            const currentTime = hour + ":" + minute + ":" + second;
            return currentTime;
        };

        const [time, setTime] = useState(getCurrentTime());
        useEffect(() => {
            // https://stackoverflow.com/questions/70734401/creating-clock-in-react
            setInterval(() => {
                const currentTime = getCurrentTime();
                setTime(currentTime);
            }, 1000);
        }, []);

        return <span>{time}</span>;
    };

    const getCurrentDate = () => {
        const dateObject = new Date();
        const currentDate = dateObject.toDateString();

        return currentDate;
    };

    return (
        <Stack direction="column" spacing={2}>
            <Stack direction="column" spacing={0}>
                <Typography level="body-sm">(GMT+7)</Typography>
                <Typography level="h1">
                    <Realtime />
                </Typography>
            </Stack>
            <Typography level="body-lg">{getCurrentDate()}</Typography>
        </Stack>
    );
};

const InfoCard = () => {
    return (
        <Stack direction="row">
            <Stack direction="column" spacing={4}>
                <Typography level="title-lg">Student</Typography>
                <Stack direction="row" spacing={4}>
                    <Stack direction="column">
                        <Typography startDecorator={<Event />}>
                            Current schedule
                        </Typography>
                        <Typography
                            startDecorator={
                                <Chip variant="soft" color="success">
                                    B6-603
                                </Chip>
                            }
                            color="success"
                        >
                            14:00 - 16:00, Aug 14, 2024
                        </Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography startDecorator={<Event />}>
                            Next schedule
                        </Typography>
                        <Typography
                            startDecorator={<Chip variant="soft">B6-603</Chip>}
                        >
                            16:00 - 18:00, Aug 14, 2024
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

const GeneralPanel = () => {
    return (
        <Box>
            <Card>
                <Stack direction="row" justifyContent="space-between">
                    <ClockCard />
                    <InfoCard />
                </Stack>
            </Card>
        </Box>
    );
};

export default GeneralPanel;

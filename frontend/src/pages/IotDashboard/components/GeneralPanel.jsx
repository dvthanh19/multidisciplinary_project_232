import { Box, Card, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

const ClockCard = () => {
    const Realtime = () => {
        const getCurrentTime = () => {
            const dateObject = new Date();

            const hour = dateObject.getHours();
            const minute = dateObject.getMinutes();
            const second = dateObject.getSeconds();

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
        <Card>
            Here should be (1) what room you are in charge, (2) your schedule
            ends at (well just UI, no implementation needed), (3)
        </Card>
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

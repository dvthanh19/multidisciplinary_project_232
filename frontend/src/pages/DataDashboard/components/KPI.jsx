import { Typography, Grid, Stack, Card, Box } from "@mui/joy";

import BubbleChartIcon from "@mui/icons-material/BubbleChart";

const CostKPI = () => {
    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">Estimated Cost</Typography>
                <Typography level="h1" textAlign="center">
                    $1270{" "}
                </Typography>
                <Typography level="body-lg" color="success" textAlign="center">
                    +96.2%{" "}
                    <Typography level="body-sm" color="neutral">
                        since last month
                    </Typography>
                </Typography>
            </Stack>
        </Card>
    );
};

const EnergyConsumptionKPI = () => {
    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">Energy consumed</Typography>
                <Typography level="h1" textAlign="center">
                    19.6
                    <Typography level="title-lg" color="neutral">
                        {" "}
                        kWh
                    </Typography>
                </Typography>
                <Typography level="body-lg" color="success" textAlign="center">
                    +22.5%{" "}
                    <Typography level="body-sm" color="neutral">
                        since last month
                    </Typography>
                </Typography>
            </Stack>
        </Card>
    );
};

const IssueTrackerKPI = () => {
    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">System issues</Typography>
                <Typography level="h1" textAlign="center">
                    4
                </Typography>
                <Typography level="body-lg" color="success" textAlign="center">
                    +1{" "}
                    <Typography level="body-sm" color="neutral">
                        since last week.
                    </Typography>
                </Typography>
            </Stack>
        </Card>
    );
};

const KPI = () => {
    return (
        <Stack direction="column" spacing={2}>
            <Typography color="neutral" endDecorator={<BubbleChartIcon />}>
                Key Performance Indicators
            </Typography>
            <Stack direction="row" spacing={2}>
                <CostKPI />
                <EnergyConsumptionKPI />
                <IssueTrackerKPI />
            </Stack>
        </Stack>
    );
};

export default KPI;

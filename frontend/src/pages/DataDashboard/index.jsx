import PageLayout from "layouts/PageLayout";
import { Typography, Grid, Stack, Card, Box } from "@mui/joy";

import DevicesPieSurface from "./components/DevicesPieSurface";

import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import TimerIcon from "@mui/icons-material/Timer";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

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

const EneryConsumptionTrend = () => {
    return (
        <Card sx={{ minWidth: 400 }}>
            Bar chart of total energy consumption within a day.
        </Card>
    );
};

const EnergyConsumptionDistributionTrend = () => {
    return (
        <Card>
            Pie chart of percentages of each device contributing to the total
            energy consumption
        </Card>
    );
};

const DataDashboard = () => {
    return (
        <PageLayout focusOnRouteID={"datadashboard"}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid container spacing={6} xs={8}>
                    <Grid ys={4} sx={{ flexGrow: 1 }}>
                        <Stack direction="column" spacing={2}>
                            <Typography
                                color="neutral"
                                endDecorator={<BubbleChartIcon />}
                            >
                                Key Performance Indicators
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <CostKPI />
                                <EnergyConsumptionKPI />
                                <IssueTrackerKPI />
                            </Stack>
                        </Stack>
                    </Grid>
                    <Box width="100%" />
                    <Grid ys={8}>
                        <Stack direction="column" spacing={2}>
                            <Typography
                                color="neutral"
                                endDecorator={<QueryStatsIcon />}
                            >
                                Trend Analysis
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <EneryConsumptionTrend />
                                <EnergyConsumptionDistributionTrend />
                            </Stack>
                            <Stack direction="row" spacing>
                                <Card>
                                    Doughnut chart about distribution of devices
                                    across different geographical locations
                                </Card>
                                <Card>
                                    Radar chart to show cost estimation towards different geographical locations
                                </Card>
                            </Stack>
                            {/* <DevicesPieSurface /> */}
                        </Stack>
                    </Grid>
                </Grid>
                <Grid spacing={6} xs={4}>
                    <Stack direction="column" spacing={2}>
                        <Typography
                            color="neutral"
                            endDecorator={<TimerIcon />}
                        >
                            Device Tracking
                        </Typography>
                        <Card>
                            <Typography>
                                Small Scatter Plot for Energy Consumption of a
                                SPECIFIC device (there will be an option button
                                to choose which device here)
                            </Typography>
                        </Card>
                        <Card>
                            <Typography>Line chart of operating cost for a device across different time in a day </Typography>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
            {/* <List name="Devices Meta Analytics">
                <DevicesPieSurface />
            </List> */}
        </PageLayout>
    );
};

export default DataDashboard;

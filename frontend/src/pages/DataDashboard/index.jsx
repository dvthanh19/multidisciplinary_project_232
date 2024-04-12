import PageLayout from "layouts/PageLayout";
import { Typography, Grid, Stack, Card, Box } from "@mui/joy";
import { Line, Bar, Pie, Radar, Doughnut } from "react-chartjs-2";
import DataActions from "./components/DataActions";

import KPI from "./components/KPI";
import AnomalyTracker from "./components/AnomalyTracker";
import TrendAnalysis from "./components/TrendAnalysis";

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
    const dataHourly = {
        labels: ["0:00", "3:00", "6:00", "9:00", "12:00", "14:00", "16:00"],
        datasets: [
            {
                label: "Consumption over time",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataDaily = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Consumption over time",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">
                    Energy consumption over time
                </Typography>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Bar data={dataHourly}></Bar>
                    <Line data={dataDaily}></Line>
                </Stack>
            </Stack>
        </Card>
    );
};

const EnergyPerDevicesTrend = () => {
    const data = {
        labels: [
            "Light",
            "Fan",
            "Temperature sensor",
            "Light sensor",
            "Door",
            "device01",
            "sensor02",
        ],
        datasets: [
            {
                label: "Hourly consumption",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">Energy per device</Typography>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Pie data={data}></Pie>
                </Stack>
            </Stack>
        </Card>
    );
};

const CostPerLocationTrend = () => {
    const data = {
        labels: [
            "B1-101",
            "B1-102",
            "B4-103",
            "B4-109",
            "B4-207",
            "A3-SV",
            "B5-109",
        ],
        datasets: [
            {
                label: "Cost estimation",
                data: [65, 59, 90, 81, 56, 55, 40],
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
                pointBackgroundColor: "rgb(255, 99, 132)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(255, 99, 132)",
            },
            {
                label: "Number of devices",
                data: [28, 48, 40, 19, 96, 27, 100],
                fill: true,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
                pointBackgroundColor: "rgb(54, 162, 235)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(54, 162, 235)",
            },
        ],
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">Cost per location</Typography>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Radar data={data}></Radar>
                </Stack>
            </Stack>
        </Card>
    );
};

const DevicesPerLocation = () => {
    const data = {
        labels: [
            "B1-101",
            "B1-102",
            "B4-103",
            "B4-109",
            "B4-207",
            "A3-SV",
            "B5-109",
        ],
        datasets: [
            {
                label: "Hourly consumption",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">Devices per location</Typography>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Doughnut data={data}></Doughnut>
                </Stack>
            </Stack>
        </Card>
    );
};

const CostTrend = () => {
    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "$",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">Monthly Cost Trends</Typography>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Line data={data}></Line>
                </Stack>
            </Stack>
        </Card>
    );
};

const DataDashboard = () => {
    return (
        <PageLayout focusOnRouteID={"datadashboard"}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid container spacing={6} xs={8}>
                    <Grid ys={4} sx={{ flexGrow: 1 }}>
                        <KPI/>
                    </Grid>
                    <Box width="100%" />
                    <Grid ys={8}>
                        <TrendAnalysis />
                    </Grid>
                </Grid>
                <Grid xs={4}>
                    <Stack direction="column" spacing={6}>
                        <AnomalyTracker />
                        <DataActions />
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

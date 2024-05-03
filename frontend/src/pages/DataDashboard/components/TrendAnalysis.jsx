import {
    Typography,
    Grid,
    Stack,
    Card,
    Box,
    Tooltip,
    IconButton,
    Input,
} from "@mui/joy";

import {
    QueryStats,
    ArrowUpward,
    Subject,
    DataObject,
} from "@mui/icons-material";
import { Line, Bar, Pie, Radar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const EnergyConsumptionPerDevice = () => {
    const dataDaily = {
        labels: ["23/04/2024", "24/04/2024", "25/04/2024", "26/04/2024", "27/04/2024", "28/04/2024", "29/04/2024"],
        datasets: [
            {
                label: "Quạt",
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
            {
                label: "Đèn",
                data: [27, 49, 15, 23, 47, 66, 44],
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
            <Stack direction="column">
                <Typography color="neutral">
                    Energy consumption trends
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Grid xs={8}>
                        <Line data={dataDaily} />
                        <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row">
                                <Tooltip title="Export as CSV">
                                    <IconButton>
                                        <Subject />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Export as JSON">
                                    <IconButton>
                                        <DataObject />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <Input type="date" />
                                <Typography> to </Typography>
                                <Input type="date" />
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid xs={4}>
                        <Stack direction="column" spacing={2}>
                            <Typography level="title-lg">Analytics</Typography>
                            <Stack direction="column">
                                <Typography level="title-sm">
                                    Most increased last 7 days
                                </Typography>
                                <Typography variant="soft" color="danger">
                                    {"Quạt"} ({"+8.2%"})
                                </Typography>
                            </Stack>
                            <Stack direction="column">
                                <Typography level="title-sm">
                                    Most decreased last 7 days
                                </Typography>
                                <Typography variant="soft" color="success">
                                    {"Đèn"} ({"-1.2%"})
                                </Typography>
                            </Stack>
                            <Stack direction="column">
                                <Typography level="title-sm">
                                    Peak consumption
                                </Typography>
                                <Stack direction="column">
                                    <Typography variant="soft" color="danger">
                                        {"Đèn"} ({"90 kWh"}) on{" "}
                                        {"Sat, March 23, 2024"}
                                    </Typography>
                                    <Typography variant="soft" color="danger">
                                        {"(4 days ago)"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Stack>
            </Stack>
        </Card>
    );
};

const TrendAnalysis = () => {
    return (
        <Stack direction="column" spacing={2}>
            <Typography color="neutral" endDecorator={<QueryStats />}>
                Trend Analysis
            </Typography>
            <EnergyConsumptionPerDevice />
        </Stack>
    );
};

export default TrendAnalysis;

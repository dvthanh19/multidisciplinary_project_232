import {
    Typography,
    Grid,
    Stack,
    Card,
    Box,
    Modal,
    ModalDialog,
    ModalClose,
    IconButton,
    Dropdown,
    MenuButton,
    Menu,
    MenuItem,
    Tooltip,
    Chip,
    Checkbox,
} from "@mui/joy";

import {
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TablePagination,
    Table,
} from "@mui/material";

import { Button, DialogContent, DialogTitle } from "@mui/material";

import {
    BubbleChart,
    Info,
    NavigateBefore,
    NavigateNext,
    FileDownload,
    Subject,
    DataObject,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

import { Line, Bar, Pie, Radar, Doughnut } from "react-chartjs-2";
import { getConsumptionKPI } from "./functions/getConsumption";
import computeCost from "./functions/computeCost";
import getIssues from "./functions/getIssues";

const CostKPI = () => {
    const [open, setOpen] = useState(false);

    const [thisWeekCost, setThisWeekCost] = useState(0.0);
    const [deltaCost, setDeltaCost] = useState(0.0);

    const loadsFigures = async () => {
        const [thisWeekKWH, ignore, lastWeekConsump, lastOfLastWeekConsump] =
            await getConsumptionKPI();
        const vnd = await computeCost(thisWeekKWH);
        const dollar = vnd / 25000.0;
        setThisWeekCost(dollar);

        const lastWeekVND = await computeCost(lastWeekConsump);
        const lastOfLastWeekVND = await computeCost(lastOfLastWeekConsump);
        const deltaCost =
            1.0 -
            (lastWeekVND - lastOfLastWeekVND) /
                (lastWeekVND + lastOfLastWeekVND);
        setDeltaCost(deltaCost);
    };

    useEffect(() => {
        loadsFigures();
    }, []);

    const DetailModal = ({ open, setOpen }) => {
        const dataDaily = {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "Daily cost",
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

        const options = {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "$ U.S. Dollars",
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Weekdays",
                    },
                },
            },
        };

        return (
            <Modal open={open}>
                <ModalDialog minWidth={500}>
                    <DialogTitle>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography level="title-lg">
                                Weekly Incurred Cost
                            </Typography>
                            <Button
                                variant="plain"
                                onClick={() => setOpen(false)}
                            >
                                Done
                            </Button>
                        </Stack>
                        <Typography level="body-sm">
                            Computed based on{" "}
                            <a href="https://www.evn.com.vn/c3/calc/Cong-cu-tinh-hoa-don-tien-dien-9-172.aspx">
                                official EVN APIs.
                            </a>
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
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
                        <Bar data={dataDaily} options={options}></Bar>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IconButton>
                                <NavigateBefore />
                            </IconButton>
                            <Typography>
                                June 29, 2023 - July 06, 2023
                            </Typography>
                            <IconButton>
                                <NavigateNext />
                            </IconButton>
                        </Stack>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        );
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography
                    level="title-lg"
                    endDecorator={
                        <IconButton
                            size="sm"
                            color="primary"
                            onClick={() => setOpen(true)}
                        >
                            <Info />
                        </IconButton>
                    }
                >
                    Cost this week
                </Typography>
                <Typography level="h1" textAlign="center">
                    ${thisWeekCost.toFixed(2)}{" "}
                </Typography>
                <Typography
                    level="body-lg"
                    color={deltaCost > 0 ? "danger" : "success"}
                    textAlign="center"
                >
                    {deltaCost > 0 ? "+" : "-"}
                    {(deltaCost * 100).toFixed(2)}%{" "}
                    <Typography level="body-sm" color="neutral">
                        since last week
                    </Typography>
                </Typography>
            </Stack>
            <DetailModal open={open} setOpen={setOpen} />
        </Card>
    );
};

const EnergyConsumptionKPI = () => {
    const [open, setOpen] = useState(false);

    const [thisWeekConsump, setThisWeekConsump] = useState(0.0);
    const [deltaLastWeekConsump, setDeltaLastWeekConsump] = useState(0.0);

    const loadsFigures = async () => {
        const [thisWeekConsumption, deltaLastWeekConsumption, a, b] =
            await getConsumptionKPI();

        setThisWeekConsump(thisWeekConsumption);
        setDeltaLastWeekConsump(deltaLastWeekConsumption);
    };

    useEffect(() => {
        loadsFigures();
    }, []);

    const DetailModal = ({ open, setOpen }) => {
        const dataDaily = {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "Daily consumption",
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

        const options = {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "kWh",
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Weekdays",
                    },
                },
            },
        };

        return (
            <Modal open={open}>
                <ModalDialog minWidth={500}>
                    <DialogTitle>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography level="title-lg">
                                Weekly Energy Consumption
                            </Typography>
                            <Button
                                variant="plain"
                                onClick={() => setOpen(false)}
                            >
                                Done
                            </Button>
                        </Stack>
                    </DialogTitle>
                    <DialogContent>
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
                        <Bar data={dataDaily} options={options}></Bar>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IconButton>
                                <NavigateBefore />
                            </IconButton>
                            <Typography>
                                June 29, 2023 - July 06, 2023
                            </Typography>
                            <IconButton>
                                <NavigateNext />
                            </IconButton>
                        </Stack>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        );
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography
                    level="title-lg"
                    endDecorator={
                        <IconButton
                            size="sm"
                            color="primary"
                            onClick={() => setOpen(true)}
                        >
                            <Info />
                        </IconButton>
                    }
                >
                    Energy this week
                </Typography>
                <Typography level="h1" textAlign="center">
                    {thisWeekConsump.toFixed(2)}
                    <Typography level="title-lg" color="neutral">
                        {" "}
                        kWh
                    </Typography>
                </Typography>
                <Typography
                    level="body-lg"
                    color={deltaLastWeekConsump > 0 ? "danger" : "success"}
                    textAlign="center"
                >
                    {deltaLastWeekConsump > 0 ? "+" : "-"}
                    {(deltaLastWeekConsump * 100).toFixed(2)}%{" "}
                    <Typography level="body-sm" color="neutral">
                        since last week
                    </Typography>
                </Typography>
            </Stack>
            <DetailModal open={open} setOpen={setOpen} />
        </Card>
    );
};

const DevicesStatusKPI = () => {
    const [open, setOpen] = useState(false);

    const [allIssues, setIssues] = useState([]);
    const [numberOfIssues, setNumberOfIssues] = useState(0);
    const [yesterdayIssues, setYesterdayIssues] = useState(0);
    const [numberOfCriticalIssues, setCriticalIssues] = useState(0);

    const loadsFigures = async () => {
        const getElapsedDays = (ref_date) => {
            let date = new Date(ref_date);
            // Chi Thu set data vay ko thay big day differences
            // Nen ma dao bang cach tru them date tu date fetch ve
            const today = new Date(Date.now());
            date = new Date(date.setDate(date.getDate() - 3));
            const deltaDate = Math.floor(
                (today - date) / (1000 * 60 * 60 * 24)
            );

            return deltaDate;
        };
        let allIssues = await getIssues();
        allIssues = allIssues.map((issue) => {
            issue.elapsed = getElapsedDays(issue.date);
            return issue;
        });
        setIssues(allIssues);
        setNumberOfIssues(allIssues.length);

        const elapsed = allIssues.map((issue) => {
            return getElapsedDays(issue.date);
        });
        const numberOfYesterday = elapsed.filter((x) => {
            return x == 1;
        }).length;
        setYesterdayIssues(numberOfYesterday);

        const numberOfSevereIssues = allIssues.filter((issue) => {
            return issue.severity == "High";
        }).length;
        setCriticalIssues(numberOfSevereIssues);
    };

    useEffect(() => {
        loadsFigures();
    }, []);

    const DetailModal = ({ open, setOpen }) => {
        const IssueList = () => {
            return (
                <TableContainer sx={{ maxHeight: "40vh" }}>
                    <Table stickyHeader borderAxis="x" size="sm">
                        <colgroup>
                            <col width="1%" />
                            <col width="1%" />
                            <col width="20%" />
                            <col width="1%" />
                            <col width="1%" />
                            <col width="20%" />
                            <col width="1%" />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Severity</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Device</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Feedback</TableCell>
                                <TableCell>Complete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allIssues.map((issue, idx) => (
                                <TableRow>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>
                                        <Chip color="danger" size="sm">
                                            {issue.severity}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        {issue.elapsed} days ago
                                    </TableCell>
                                    <TableCell>{issue.device}</TableCell>
                                    <TableCell>{issue.location}</TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: "20vw",
                                            overflow: "scroll",
                                        }}
                                    >
                                        {issue.feedback}
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            onClick={() =>
                                                setIssues(
                                                    allIssues.filter(
                                                        (ref_issue) =>
                                                            ref_issue.number !=
                                                            issue.number
                                                    )
                                                )
                                            }
                                            color="primary"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        };

        return (
            <Modal open={open}>
                <ModalDialog minWidth={500}>
                    <DialogTitle>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography level="title-lg">
                                Unhandled Issues
                            </Typography>
                            <Button
                                variant="plain"
                                onClick={() => setOpen(false)}
                            >
                                Done
                            </Button>
                        </Stack>
                    </DialogTitle>
                    <DialogContent>
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
                        <IssueList />
                    </DialogContent>
                </ModalDialog>
            </Modal>
        );
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography
                    level="title-lg"
                    endDecorator={
                        <IconButton
                            size="sm"
                            color="primary"
                            onClick={() => setOpen(true)}
                        >
                            <Info />
                        </IconButton>
                    }
                >
                    Unhandled Issues
                </Typography>
                <Typography level="h1" textAlign="center">
                    {numberOfIssues}
                </Typography>
                <Typography level="body-lg" textAlign="center">
                    <Typography color="success">
                        +{yesterdayIssues}{" "}
                        <Typography level="body-sm" color="neutral">
                            yesterday
                        </Typography>
                    </Typography>
                    ,{" "}
                    <Typography color="danger">
                        {numberOfCriticalIssues}{" "}
                        <Typography level="body-sm" color="neutral">
                            critical
                        </Typography>
                    </Typography>
                </Typography>
            </Stack>
            <DetailModal open={open} setOpen={setOpen} />
        </Card>
    );
};

const KPI = () => {
    return (
        <Stack direction="column" spacing={2}>
            <Typography color="neutral" endDecorator={<BubbleChart />}>
                Key Metrics
            </Typography>
            <Stack direction="row" spacing={1}>
                <Grid xs={4}>
                    <CostKPI />
                </Grid>
                <Grid xs={4}>
                    <EnergyConsumptionKPI />
                </Grid>
                <Grid xs={4}>
                    <DevicesStatusKPI />
                </Grid>
            </Stack>
        </Stack>
    );
};

export default KPI;

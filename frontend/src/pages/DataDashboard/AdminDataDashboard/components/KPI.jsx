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
import { useState } from "react";

import { Line, Bar, Pie, Radar, Doughnut } from "react-chartjs-2";

const CostKPI = () => {
    const [open, setOpen] = useState(false);

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

        /**
         * API cua EVN de tinh gia dien (dua tren kWh)
         * Trang web cua ENV:
         * https://www.evn.com.vn/c3/calc/Cong-cu-tinh-hoa-don-tien-dien-9-172.aspx
         * 
         * API cua EVN:
         * `POST https://calc.evn.com.vn/TinhHoaDon/api/Calculate`
         * request body (vi du):
         * `{
                "KIMUA_CSPK": "0",
                "LOAI_DDO": "1",
                "SO_HO": 1,
                "MA_CAPDAP": "1",
                "NGAY_DKY": "03/05/2024",
                "NGAY_CKY": "03/06/2024",
                "NGAY_DGIA": "01/01/1900",
                "HDG_BBAN_APGIA": [
                    {
                        "LOAI_BCS": "KT",
                        "TGIAN_BANDIEN": "KT",
                        "MA_NHOMNN": "SHBT",
                        "MA_NGIA": "A"
                    }
                ],
                "GCS_CHISO": [
                    {
                        "BCS": "KT",
                        "SAN_LUONG": "130", <------- kWh, chac minh chi can doi cai nay thoi la ok!
                        "LOAI_CHISO": "DDK"
                    }
                ]
            }`
         * Giu nguyen cai format cua request body tren, chi can thay doi key "SAN_LUONG"
         * 
         * Ve response body cua no, minh khong can quan tam cac key khac, chi can quan tam duy
         * nhat 1 key `SO_TIEN`
         * Data["HDN_HDON"]["SO_TIEN"] --> trich xuat gia tri nay ra la co computed Cost
         */

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
                    $1270{" "}
                </Typography>
                <Typography level="body-lg" color="success" textAlign="center">
                    +96.2%{" "}
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
                    19.6
                    <Typography level="title-lg" color="neutral">
                        {" "}
                        kWh
                    </Typography>
                </Typography>
                <Typography level="body-lg" color="success" textAlign="center">
                    +22.5%{" "}
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
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>
                                    <Chip color="danger" size="sm">
                                        Critical
                                    </Chip>
                                </TableCell>
                                <TableCell>2 days ago</TableCell>
                                <TableCell>Quạt</TableCell>
                                <TableCell>B4-101</TableCell>
                                <TableCell sx={{maxWidth: "20vw", overflow: "scroll"}}>
                                    "oH NO please help, device is down!" This
                                    field can be empty. 
                                </TableCell>
                                <TableCell>
                                    <Checkbox onClick={() => alert("Once clicked complete, issue 'resolved' flag is sent to the backend, and this table row is removed from UI.")} color="primary" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>
                                    <Chip color="warning" size="sm">
                                        Adequate
                                    </Chip>
                                </TableCell>
                                <TableCell>2 days ago</TableCell>
                                <TableCell>Đèn</TableCell>
                                <TableCell>B4-101</TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                <Checkbox onClick={() => alert("Once clicked complete, issue 'resolved' flag is sent to the backend, and this table row is removed from UI.")} color="primary" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>
                                    <Chip color="warning" size="sm">
                                        Low
                                    </Chip>
                                </TableCell>
                                <TableCell>14 days ago</TableCell>
                                <TableCell>Đèn</TableCell>
                                <TableCell>B6-101</TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                <Checkbox onClick={() => alert("Once clicked complete, issue 'resolved' flag is sent to the backend, and this table row is removed from UI.")} color="primary" />
                                </TableCell>
                            </TableRow>
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
                    14
                </Typography>
                <Typography level="body-lg" textAlign="center">
                    <Typography color="success">
                        +2{" "}
                        <Typography level="body-sm" color="neutral">
                            yesterday
                        </Typography>
                    </Typography>
                    ,{" "}
                    <Typography color="danger">
                        4{" "}
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

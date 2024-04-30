import {
    Stack,
    Card,
    Typography,
    Box,
    Modal,
    ModalDialog,
    ModalClose,
    Chip,
} from "@mui/joy";
import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { render } from "react-dom";
import ChartDataLabels from "chartjs-plugin-datalabels";

const TotalUsers = () => {
    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">Total users</Typography>
                <Typography level="h1" textAlign="center">
                    1270{" "}
                </Typography>
                <Typography level="body-lg" color="success" textAlign="center">
                    +8.2%{" "}
                    <Typography level="body-sm" color="neutral">
                        last month
                    </Typography>
                </Typography>
            </Stack>
        </Card>
    );
};

const UserRoles = () => {
    const fakeUserRolesData = {
        labels: ["Student", "Teacher", "Admin"],
        datasets: [
            {
                label: "Number of people",
                data: [12, 19, 3],
            },
        ],
    };

    const pieOptions = {
        plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: "white",
            },
        },
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">User roles</Typography>
                <Pie data={fakeUserRolesData} options={pieOptions} plugins={[ChartDataLabels]}/>
            </Stack>
        </Card>
    );
};

const LoginIntensity = () => {
    const fakeLoginData = {
        labels: ["0:00", "3:00", "6:00", "9:00", "12:00", "14:00", "16:00"],
        datasets: [
            {
                label: "Number of logins",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const [open, setOpen] = useState(false);

    const DetailModal = ({ open, setOpen }) => {
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
                                Daily login distribution
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
                        <Stack direction="column" spacing={1}>
                            <Bar data={fakeLoginData} />
                            <Typography level="body-lg">
                                Average per hour:{" "}
                                <Typography color="primary" variant="solid">
                                    12.7
                                </Typography>
                            </Typography>
                            <Typography level="body-lg">
                                Last peak:{" "}
                                <Typography color="primary" variant="solid">
                                    16400
                                </Typography>{" "}
                                {/* an_ammount_of_login_that_exceeds_every_other_amount */}
                                at <Chip color="primary">16:20 30/04/1975</Chip>
                            </Typography>
                        </Stack>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        );
    };

    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Stack direction="column">
                    <Typography level="title-lg">
                        Daily login distribution
                    </Typography>
                    <Typography level="body-sm">*averaged weekly</Typography>
                </Stack>
                <Bar onClick={() => setOpen(true)} data={fakeLoginData} />
            </Stack>
            <DetailModal open={open} setOpen={setOpen} />
        </Card>
    );
};

const UserDashboard = () => {
    return (
        <Stack direction="column" spacing={2}>
            <TotalUsers />
            <UserRoles />
            <LoginIntensity />
        </Stack>
    );
};

export default UserDashboard;

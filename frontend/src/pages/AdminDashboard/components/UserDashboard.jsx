import { Stack, Card, Typography } from "@mui/joy";
import { Line, Pie } from "react-chartjs-2";

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
                        since last month
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
    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">User roles</Typography>
                <Pie data={fakeUserRolesData} />
            </Stack>
        </Card>
    );
};

const LoginIntensity = () => {
    const fakeLoginData = {
        labels: ["0:00", "3:00", "6:00", "9:00", "12:00", "14:00", "16:00"],
        datasets: [
            {
                label: "Requests",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };
    return (
        <Card>
            <Stack direction="column" spacing={1}>
                <Typography level="title-lg">Login intensity</Typography>
                <Line data={fakeLoginData} />
            </Stack>
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

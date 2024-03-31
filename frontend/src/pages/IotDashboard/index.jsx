import PageLayout from "layouts/PageLayout";
import DeviceList from "components/DeviceList";
import { Card } from "@mui/joy";

const IotDashboard = () => {
    return (
        <PageLayout focusOnRouteID={"home"}>
            <DeviceList />
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </PageLayout>
    );
};

export default IotDashboard;

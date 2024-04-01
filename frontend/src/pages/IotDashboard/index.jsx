import PageLayout from "layouts/PageLayout";
import DeviceList from "components/DeviceList";
import SensorList from "components/SensorList";
import { Card } from "@mui/joy";

const IotDashboard = () => {
    return (
        <PageLayout focusOnRouteID={"home"}>
            <DeviceList />
            <SensorList />
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

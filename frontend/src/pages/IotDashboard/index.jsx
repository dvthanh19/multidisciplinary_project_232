import PageLayout from "layouts/PageLayout";
import DeviceList from "./components/DeviceList";
import { Card } from "@mui/joy";

const IotDashboard = () => {
    return (
        console.log("IotDashboard"),
        <PageLayout focusOnRouteID={"iotdashboard"}>
            <DeviceList type="Device"/>
            <DeviceList type="Sensor"/>
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

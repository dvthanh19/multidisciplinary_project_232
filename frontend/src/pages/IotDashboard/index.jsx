import PageLayout from "layouts/PageLayout";
import DeviceList from "./components/DeviceList";
import GeneralPanel from "./components/GeneralPanel.jsx";
import EventLogs from "./components/EventLogs.jsx";
import { Card, Box } from "@mui/joy";

const IotDashboard = () => {
    return (
        console.log("IotDashboard"),
        (
            <PageLayout focusOnRouteID={"iotdashboard"}>
                <GeneralPanel />
                <DeviceList type="Device" />
                <DeviceList type="Sensor" />
                <EventLogs />
            </PageLayout>
        )
    );
};

export default IotDashboard;

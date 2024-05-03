import PageLayout from "layouts/PageLayout";
import DeviceList from "./components/DeviceList";
import GeneralPanel from "./components/GeneralPanel.jsx";

const StudentIotDashboard = () => {
    return (
        console.log("StudentIotDashboard"),
        (
            <PageLayout focusOnRouteID={"iotdashboard"}>
                <GeneralPanel />
                <DeviceList type="Device" />
                <DeviceList type="Sensor" />
            </PageLayout>
        )
    );
};

export default StudentIotDashboard;

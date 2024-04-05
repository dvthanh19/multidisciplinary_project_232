import PageLayout from "layouts/PageLayout";
import { Card } from "@mui/joy";
import DevicesPieSurface from "./components/DevicesPieSurface";
import List from "./components/List";

const DataDashboard = () => {
    return (
        <PageLayout focusOnRouteID={"datadashboard"}>
            <List name="Devices Meta Analytics">
                <DevicesPieSurface />
            </List>
            {/* <List name="User Data Analytics">
                <Surface name="User Login Frequency">
                    <Card>
                        Embbed Bar Chart of Login frequency. To see at what hour
                        the traffic is the most stressed
                    </Card>
                </Surface>
                <Surface name="User Base ">
                    <Card>
                        Embbed Bar Chart of Login frequency. To see at what hour
                        the traffic is the most stressed
                    </Card>
                </Surface>
            </List> */}
        </PageLayout>
    );
};

export default DataDashboard;

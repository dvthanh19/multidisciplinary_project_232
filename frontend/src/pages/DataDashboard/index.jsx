import PageLayout from "layouts/PageLayout";
import { Card } from "@mui/joy";
import Surface from "./components/Surface";
import List from "./components/List";

const DataDashboard = () => {
    return (
        <PageLayout focusOnRouteID={"datadashboard"}>
            <List name="User Data Analytics"/>
        </PageLayout>
    );
};

export default DataDashboard;

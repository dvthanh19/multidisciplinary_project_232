import PageLayout from "layouts/PageLayout";
import { Typography, Grid, Stack, Card, Box } from "@mui/joy";
import DataActions from "./components/DataActions";

import KPI from "./components/KPI";
import AnomalyTracker from "./components/AnomalyTracker";
import TrendAnalysis from "./components/TrendAnalysis";

const DataDashboard = () => {
    return (
        <PageLayout focusOnRouteID={"datadashboard"}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid container spacing={6} xs={8}>
                    <Grid ys={4} sx={{ flexGrow: 1 }}>
                        <KPI/>
                    </Grid>
                    <Box width="100%" />
                    <Grid ys={8}>
                        <TrendAnalysis />
                    </Grid>
                </Grid>
                <Grid xs={4}>
                    <Stack direction="column" spacing={6}>
                        <AnomalyTracker />
                        <DataActions />
                    </Stack>
                </Grid>
            </Grid>
            {/* <List name="Devices Meta Analytics">
                <DevicesPieSurface />
            </List> */}
        </PageLayout>
    );
};

export default DataDashboard;

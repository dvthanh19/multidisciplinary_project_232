/**
 * Define metadata for routes.
 *
 * Note: Do not implement `component` field since it will raise circular dependency.
 */

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import RouterIcon from "@mui/icons-material/Router";

const routes = [
    {
        name: "Data Dashboard",
        key: "datadashboard",
        icon: <SpaceDashboardIcon />,
        route: "/datadashboard",
    },
    {
        name: "Iot Dashboard",
        key: "iotdashboard",
        icon: <RouterIcon />,
        route: "/iotdashboard",
    },
    // {
    //   type: "collapse",
    //   name: "Dashboard",
    //   key: "dashboard",
    //   icon: <Icon fontSize="small">dashboard</Icon>,
    //   route: "/dashboard",
    //   component: <Dashboard />,
    // }
];

export default routes;

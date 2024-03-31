/**
 * Define metadata for routes.
 *
 * Note: Do not implement `component` field since it will raise circular dependency.
 */

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import RouterIcon from "@mui/icons-material/Router";

const routes = [
    {
        name: "Home",
        key: "home",
        icon: <SpaceDashboardIcon />,
        route: "/home",
    },
    {
        name: "Devices",
        key: "devices",
        icon: <RouterIcon />,
        route: "/home",
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

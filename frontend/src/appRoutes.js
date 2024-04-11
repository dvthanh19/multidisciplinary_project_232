/**
 * Define metadata for routes.
 *
 * Note: Do not implement `component` field since it will raise circular dependency.
 */

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import RouterIcon from "@mui/icons-material/Router";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const routes = [
    {
        name: "Data Dashboard",
        key: "datadashboard",
        icon: <SpaceDashboardIcon />,
        route: "/data",
    },
    {
        name: "Iot Dashboard",
        key: "iotdashboard",
        icon: <RouterIcon />,
        route: "/iot",
    },
    {
        name: "Admin Dashboard",
        key: "admindashboard",
        icon: <ManageAccountsIcon />,
        route: "/admin",
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

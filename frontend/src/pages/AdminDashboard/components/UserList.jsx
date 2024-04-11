import {
    Stack,
    Table,
    IconButton,
    Typography,
    Tooltip,
    Chip,
    Dropdown,
    MenuButton,
    MenuItem,
    Menu,
    Box,
} from "@mui/joy";
import { TableContainer } from "@mui/material";
import {
    Search,
    Person,
    Create,
    DeleteForever,
    MoreHoriz,
    Badge,
} from "@mui/icons-material";

const UserInfo = ({ username }) => {
    return (
        <Tooltip
            title={"Last online: " + "12 minutes ago"}
            arrow
            color="primary"
            placement="top"
            size="lg"
        >
            <Typography
                startDecorator={<Person />}
                endDecorator={
                    <Chip color="primary" variant="soft" onClick={() => {}}>
                        Admin
                    </Chip>
                }
                fontWeight="lg"
                level="title-lg"
            >
                {username}
            </Typography>
        </Tooltip>
    );
};

const UserSettings = () => {
    <Stack direction="row">
        <Tooltip title="More..." arrow>
            <IconButton variant="plain" color="neutral">
                <MoreHoriz />
            </IconButton>
        </Tooltip>
        <Tooltip title="Grant permission" arrow>
            <Dropdown>
                <MenuButton
                    slots={{
                        root: IconButton,
                    }}
                    variant="plain"
                    color="neutral"
                >
                    <Badge />
                </MenuButton>
                <Menu>
                    <MenuItem>Admin</MenuItem>
                    <MenuItem>Student</MenuItem>
                    <MenuItem>Teacher</MenuItem>
                </Menu>
            </Dropdown>
        </Tooltip>
        <Tooltip title="Modify" arrow>
            <IconButton variant="plain" color="neutral">
                <Create />
            </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
            <IconButton variant="plain" color="danger">
                <DeleteForever />
            </IconButton>
        </Tooltip>
    </Stack>;
};

const UserRow = ({ username, usermail }) => {
    return (
        <tr>
            <td>
                <UserInfo username={username} />
            </td>
            <td>{usermail}</td>
            <td>
                <UserSettings />
            </td>
        </tr>
    );
};

const UserList = () => {
    return (
        <TableContainer sx={{ maxHeight: "80vh" }}>
            <Table borderAxis="x" size="lg" over>
                <thead></thead>
                <tbody>
                    {Array.from(Array(10).keys()).map((value, index) => {
                        return (
                            <UserRow
                                username="Nguoi ban 01"
                                usermail="nguoiban01@gmail.com"
                            />
                        );
                    }, {})}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default UserList;

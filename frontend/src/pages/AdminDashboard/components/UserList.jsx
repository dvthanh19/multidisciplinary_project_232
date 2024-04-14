import React, {useEffect, useState} from "react";
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



import axios from 'axios'; // Make sure axios is installed or use fetch instead

const UserList = () => {
    const [users, setUsers] = useState([]);  // Ensure initial state is an array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user');
                // Access the user key from the response data
                if (response.data && Array.isArray(response.data.user)) {
                    setUsers(response.data.user);
                } else {
                    console.error('Expected an array but got', typeof response.data.user);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <TableContainer sx={{ maxHeight: "80vh" }}>
            <Table borderAxis="x" size="lg">
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <UserInfo username={user.fullname} />
                            </td>
                            <td>{user.email}</td>
                            <td>
                                <UserSettings />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

const UserInfo = ({ username }) => {
    return (
        <Tooltip
            title={"Last online: 12 minutes ago"}
            arrow
            color="primary"
            placement="top"
            size="lg"
        >
            <Typography
                startDecorator={<Person />}
                endDecorator={<Chip color="primary" variant="soft">Admin</Chip>}
                fontWeight="lg"
                level="title-lg"
            >
                {username}
            </Typography>
        </Tooltip>
    );
};

const UserSettings = () => {
    return (
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
        </Stack>
    );
};

export default UserList;
import React, { useEffect, useState } from "react";
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
    Modal,
    ModalDialog,
    DialogTitle,
    Divider,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/joy";
import {
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TablePagination,
} from "@mui/material";
import {
    Search,
    Person,
    Create,
    DeleteForever,
    MoreHoriz,
    Badge,
    PeopleAlt,
    WarningRounded,
} from "@mui/icons-material";

import axios from "axios"; // Make sure axios is installed or use fetch instead

const UserList = () => {
    const [users, setUsers] = useState([]); // Ensure initial state is an array
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/user"
                );
                // Access the user key from the response data
                if (response.data && Array.isArray(response.data.user)) {
                    setUsers(response.data.user);
                } else {
                    console.error(
                        "Expected an array but got",
                        typeof response.data.user
                    );
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <TableContainer sx={{ maxHeight: "80vh" }}>
            <Table borderAxis="x" size="sm">
                <colgroup>
                    <col width="10%" />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Settings</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <UserInfo username={user.fullname} />
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <UserSettings />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={4}
                            rowsPerPageOptions={[]}
                            count={users.length}
                            page={page}
                            rowsPerPage={10}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

const UserInfo = ({ username }) => {
    return (
        <Tooltip
            title={"Last online: 12 minutes ago"}
            arrow
            color="neutral"
            placement="top"
        >
            <Typography
                endDecorator={
                    <Chip size="sm" color="primary" variant="soft">
                        Admin
                    </Chip>
                }
            >
                {username}
            </Typography>
        </Tooltip>
    );
};

const UserSettings = () => {
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [openRoleChangeConfirm, setOpenRoleChangeConfirm] = useState(false);
    const shouldBeSomethingWeGotFromTheFirstFetchFromBackend = "admin";
    const [userRole, setUserRole] = useState(
        shouldBeSomethingWeGotFromTheFirstFetchFromBackend
    );

    const ConfirmDeleteModal = ({ open, setOpen, content }) => {
        return (
            <Modal open={open}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRounded />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>{content}</DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={() => setOpen(false)}
                        >
                            Yes, delete for me
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        );
    };

    const ConfirmRoleChangeModal = ({
        open,
        setOpen,
        content,
        userRole,
        setUserRole,
    }) => {
        return (
            <Modal open={open}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRounded />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>{content}</DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="primary"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Yes, I am sure
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        );
    };

    return (
        <Stack direction="row">
            {/* Deprecated since we dont have time to implement any more features on this */}
            {/* <Tooltip title="More..." arrow>
                <IconButton variant="plain" color="neutral">
                    <MoreHoriz />
                </IconButton>
            </Tooltip> */}
            <Stack>
                <Dropdown>
                    <Tooltip title="Set role..." arrow>
                        <MenuButton
                            slots={{
                                root: IconButton,
                            }}
                            variant="plain"
                            color="neutral"
                        >
                            <PeopleAlt />
                        </MenuButton>
                    </Tooltip>
                    <Menu>
                        <MenuItem
                            selected={userRole === "admin"}
                            onClick={() => {
                                setOpenRoleChangeConfirm(true);
                                setUserRole("admin");
                            }}
                        >
                            Admin
                        </MenuItem>
                        <MenuItem
                            selected={userRole === "student"}
                            onClick={() => {
                                setOpenRoleChangeConfirm(true);
                                setUserRole("student");
                            }}
                        >
                            Student
                        </MenuItem>
                        <MenuItem
                            selected={userRole === "teacher"}
                            onClick={() => {
                                setOpenRoleChangeConfirm(true);
                                setUserRole("teacher");
                            }}
                        >
                            Teacher
                        </MenuItem>
                    </Menu>
                    <ConfirmRoleChangeModal
                        open={openRoleChangeConfirm}
                        setOpen={setOpenRoleChangeConfirm}
                        content={
                            <Typography>
                                Are you sure you want to change this user's
                                permission to <Chip>{userRole}</Chip> ?
                            </Typography>
                        }
                        userRole={userRole}
                        setUserRole={setUserRole}
                    />
                </Dropdown>
            </Stack>
            <Tooltip title="Delete" arrow>
                <Box>
                    <IconButton
                        variant="plain"
                        color="danger"
                        onClick={() => setOpenDeleteConfirm(true)}
                    >
                        <DeleteForever />
                    </IconButton>
                    <ConfirmDeleteModal
                        open={openDeleteConfirm}
                        setOpen={setOpenDeleteConfirm}
                        content="Are you sure you want to remove this user permanently?"
                    />
                </Box>
            </Tooltip>
        </Stack>
    );
};

export default UserList;

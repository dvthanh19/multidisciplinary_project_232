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
    FormControl,
    Input,
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
    DeleteForever,
    PeopleAlt,
    WarningRounded,
} from "@mui/icons-material";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [openRoleChangeConfirm, setOpenRoleChangeConfirm] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [inputSearchValue, setInputSearchValue] = useState("");

    // Function to fetch user data
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/user");
            if (response.data && Array.isArray(response.data.user)) {
                setUsers(response.data.user);
            } else {
                console.error("Expected an array but got", typeof response.data.user);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle user deletion
    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/user/${userId}`);
            if (response.status === 200) {
                console.log("User deleted successfully");
                fetchData(); // Refresh user list after deletion
            } else {
                console.error("Failed to delete user:", response.data);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Function to handle role change
    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/user/${userId}`, { role: newRole });
            if (response.status === 200) {
                console.log("User role updated successfully");
                fetchData(); // Refresh user list after role change
            } else {
                console.error("Failed to update user role:", response.data);
            }
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    // Filter users based on search value
    const filteredUsers = users.filter((user) => {
        return user.fullname.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Confirm delete modal
    const ConfirmDeleteModal = ({ open, setOpen, userId }) => {
        return (
            <Modal open={open}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRounded />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to remove this user permanently?
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={() => {
                                handleDeleteUser(userId);
                                setOpen(false);
                            }}
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

    // Confirm role change modal
    const ConfirmRoleChangeModal = ({ open, setOpen, userId }) => {
        return (
            <Modal open={open}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRounded />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to change this user's role to {userRole}?
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="primary"
                            onClick={() => {
                                handleRoleChange(userId, userRole);
                                setOpen(false);
                            }}
                        >
                            Yes, I am sure
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

    // Search bar component
    const SearchBar = () => (
        <Box display="flex" gap={1} alignItems="center">
            <FormControl sx={{ width: "500px" }}> {/* Adjusted width of the search bar */}
                <Input
                    size="sm"
                    value={inputSearchValue}
                    onChange={(event) => setInputSearchValue(event.target.value)}
                    placeholder="Search users..."
                />
            </FormControl>
            <Button
                variant="solid"
                color="primary"
                startDecorator={<Search />}
                onClick={() => {
                    setSearchValue(inputSearchValue);
                    setPage(0);
                }}
            >
                Search
            </Button>
        </Box>
    );

    return (
        <Stack spacing={2}>
            {/* Add the search bar */}
            <SearchBar />

            {/* Table to display user list */}
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
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Typography
                                            endDecorator={
                                                <Chip size="sm" color="primary" variant="soft">
                                                    {user.role}
                                                </Chip>
                                            }
                                        >
                                            {user.fullname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            {/* Dropdown for role change */}
                                            <Dropdown>
                                                <Tooltip title="Set role..." arrow>
                                                    <MenuButton
                                                        slots={{
                                                            root: IconButton,
                                                        }}
                                                        variant="plain"
                                                        color="neutral"
                                                        onClick={() => setSelectedUserId(user._id)}
                                                    >
                                                        <PeopleAlt />
                                                    </MenuButton>
                                                </Tooltip>
                                                <Menu>
                                                    <MenuItem
                                                        selected={user.role === "admin"}
                                                        onClick={() => {
                                                            setOpenRoleChangeConfirm(true);
                                                            setUserRole("admin");
                                                        }}
                                                    >
                                                        Admin
                                                    </MenuItem>
                                                    <MenuItem
                                                        selected={user.role === "student"}
                                                        onClick={() => {
                                                            setOpenRoleChangeConfirm(true);
                                                            setUserRole("student");
                                                        }}
                                                    >
                                                        Student
                                                    </MenuItem>
                                                    <MenuItem
                                                        selected={user.role === "teacher"}
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
                                                    userId={selectedUserId}
                                                />
                                            </Dropdown>

                                            {/* Button for user deletion */}
                                            <Tooltip title="Delete" arrow>
                                                <Box>
                                                    <IconButton
                                                        variant="plain"
                                                        color="danger"
                                                        onClick={() => {
                                                            setSelectedUserId(user._id);
                                                            setOpenDeleteConfirm(true);
                                                        }}
                                                    >
                                                        <DeleteForever />
                                                    </IconButton>
                                                    <ConfirmDeleteModal
                                                        open={openDeleteConfirm}
                                                        setOpen={setOpenDeleteConfirm}
                                                        userId={selectedUserId}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            // Display a message when no users match the search criteria
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Typography color="text.secondary">
                                        No user matches...
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={4}
                                rowsPerPageOptions={[]}
                                count={filteredUsers.length}
                                page={page}
                                rowsPerPage={10}
                                onPageChange={(event, newPage) => setPage(newPage)}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default UserList;
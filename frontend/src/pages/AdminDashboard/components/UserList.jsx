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

import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]); // Đảm bảo trạng thái ban đầu là một mảng
    const [page, setPage] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [openRoleChangeConfirm, setOpenRoleChangeConfirm] = useState(false);

    // Hàm để lấy danh sách người dùng
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/user");
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

    useEffect(() => {
        fetchData(); // Lấy dữ liệu ban đầu
    }, []);

    // Hàm xử lý xoá người dùng
    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/user/${userId}`);
            if (response.status === 200) {
                console.log("User deleted successfully");
                // Sau khi xoá, cập nhật lại danh sách người dùng
                fetchData();
            } else {
                console.error("Failed to delete user:", response.data);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Hàm xử lý thay đổi vai trò người dùng
    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/user/${userId}`, { role: newRole });
            if (response.status === 200) {
                console.log("User role updated successfully");
                // Sau khi thay đổi vai trò, cập nhật lại danh sách người dùng
                fetchData();
            } else {
                console.error("Failed to update user role:", response.data);
            }
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    // Modal xác nhận xoá người dùng
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

    // Modal xác nhận thay đổi vai trò người dùng
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
                                <Stack direction="row">
                                    {/* Thay đổi vai trò người dùng */}
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

                                    {/* Xoá người dùng */}
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
                            onPageChange={(event, newPage) => setPage(newPage)}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default UserList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

const DeviceDetailModal = ({ open, onClose, deviceId }) => {
    const [deviceDetail, setDeviceDetail] = useState(0);


    useEffect(() => {
        if (open) {
            const fetchDeviceDetail = async () => {
                try {
                    console.log("fetching device detail", deviceId);
                    const response = await axios.get(`http://localhost:3000/api/device/${deviceId}`);

                    setDeviceDetail(response.data.device);
                } catch (error) {
                    console.error("Failed to fetch device details:", error);
                }
            };
            fetchDeviceDetail();
        }
    }, [open, deviceId]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Device Details</DialogTitle>
            <DialogContent>
                {deviceDetail ? (
                    <>
                        <Typography>Name: {deviceDetail.name}</Typography>
                        <Typography>Type: {deviceDetail.type}</Typography>
                        <Typography>Position: {deviceDetail.position}</Typography>
                        {/* Displaying the last value and its update time from curValue */}
                        <Typography>Last Value: {deviceDetail.curValue.lastValue}</Typography>
                        <Typography>Last Updated At: {new Date(deviceDetail.curValue.updatedAt).toLocaleString()}</Typography>

                    </>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default DeviceDetailModal;

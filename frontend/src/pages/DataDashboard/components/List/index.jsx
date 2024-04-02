import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Chip, Box, Typography, Card } from "@mui/joy";
import Surface from "../Surface";

const DeviceList = ({ name }) => {

    return (
        <Stack spacing={6} direction="column">

            <Stack spacing={1} direction="column">
                <Stack spacing={1} direction="row">
                    <Typography sx={{ color: "neutral.500" }}>
                        {name}
                    </Typography>
                </Stack>
                <Stack
                    spacing={2}
                    direction="row"
                    flexWrap="nowrap"
                    sx={{ overflow: "auto" }}
                >
                    <Surface name="User Login Frequency" dataComponent={<Card>Embbed Bar Chart of Login frequency. To see at what hour the traffic is the most stressed</Card>}/>
                    <Surface name="User Base " dataComponent={<Card>Embbed Textual info. To see how the system grow in User base.</Card>}/>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default DeviceList;

import { Stack, Slider, Box, Typography } from "@mui/joy";

/**
 * Control panel for "Lights" devices
 *
 * For prototype Reason
 */
const LightControlPanel = ({isDisabled = false}) => {
    return (
        <Stack direction="column">
            <Box>
                <Typography color="neutral">Light intensity</Typography>
                <Box sx={{ px: 5 }}>
                    <Slider
                        track={false}
                        aria-label="Small steps"
                        defaultValue={0.00000005}
                        step={300}
                        marks
                        min={0}
                        max={1024}
                        valueLabelDisplay="auto"
                        color="neutral"
                        disabled={isDisabled ? true : false}
                    />
                </Box>
            </Box>
            <Box />
            {Array.from(Array(15)).map((_, index) => (
                <Box>Stack {index}</Box>
            ))}
        </Stack>
    );
};

export default LightControlPanel;

import React from 'react';
import { Box, Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const ReleaseVoucherStats = () => {
    const [timeFrame, setTimeFrame] = React.useState('today');
    const theme = useTheme();

    const handleChange = (event: any) => {
        setTimeFrame(event.target.value);
    };

    return (
        <Box
            sx={{
                boxShadow: theme.shadows[3],
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <DashboardCard title="Release Voucher">
                <div>
                    <Select
                        labelId="time-frame-select"
                        id="time-frame-select"
                        value={timeFrame}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="week">This Week</MenuItem>
                        <MenuItem value="month">This Month</MenuItem>
                        <MenuItem value="year">This Year</MenuItem>
                    </Select>
                    <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main}>
                        {/* Replace with actual data */}
                        Total: 120
                    </Typography>
                </div>
            </DashboardCard>
        </Box>
    );
};

export default ReleaseVoucherStats;
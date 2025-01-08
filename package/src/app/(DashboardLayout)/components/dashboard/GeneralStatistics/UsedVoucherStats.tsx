import React from 'react';
import { Grid, Box, Typography, Select, MenuItem, SelectChangeEvent, useTheme } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const UsedVoucherStats = () => {
    type TimeFrame = 'today' | 'week' | 'month' | 'year';
    const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('today');
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<TimeFrame>) => {
        setTimeFrame(event.target.value as TimeFrame);
    };

    const usedVouchers: Record<TimeFrame, number> = {
        today: 50,
        week: 200,
        month: 800,
        year: 5000,
    };

    return (
        <Box
            sx={{
                boxShadow: theme.shadows[3],
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <DashboardCard title="Used Vouchers">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Select
                            value={timeFrame}
                            onChange={handleChange}
                            size="small"
                        >
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="week">This Week</MenuItem>
                            <MenuItem value="month">This Month</MenuItem>
                            <MenuItem value="year">This Year</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main}>
                            Total: {usedVouchers[timeFrame]}
                        </Typography>
                    </Grid>
                </Grid>
            </DashboardCard>
        </Box>
    );
};

export default UsedVoucherStats;
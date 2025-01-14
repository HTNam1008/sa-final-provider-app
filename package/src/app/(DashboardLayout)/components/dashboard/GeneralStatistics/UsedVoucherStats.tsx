import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Box, Typography, Select, MenuItem, SelectChangeEvent, useTheme } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const UsedVoucherStats = () => {
    type TimeFrame = 'today' | 'week' | 'month' | 'year';
    const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('today');
    const [usedVoucherCount, setUsedVoucherCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
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

    useEffect(() => {
        const fetchUsedVoucherData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.example.com/vouchers/used?timeFrame=${timeFrame}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch used voucher data');
                }
                const data = await response.json();
                setUsedVoucherCount(data.total); // Assuming the API returns an object with a 'total' field
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsedVoucherData();
    }, [timeFrame]);

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
                        <div>
                            {loading ? (
                                <CircularProgress />
                            ) : error ? (
                                <Typography color="error">{error}</Typography>
                            ) : (
                                <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main}>
                                    Total: {usedVoucherCount !== null ? usedVoucherCount : 'N/A'}
                                </Typography>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </DashboardCard>
        </Box>
    );
};

export default UsedVoucherStats;
import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const ReleaseVoucherStats = () => {
    const [timeFrame, setTimeFrame] = React.useState('today');
    const theme = useTheme();
    const [voucherCount, setVoucherCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: any) => {
        setTimeFrame(event.target.value);
    };

    useEffect(() => {
        const fetchVoucherData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.example.com/vouchers/released?timeFrame=${timeFrame}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch voucher data');
                }
                const data = await response.json();
                setVoucherCount(data.total); // Assuming the API returns an object with a 'total' field
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVoucherData();
    }, [timeFrame]);

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
                    <div>
                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main}>
                                Total: {voucherCount !== null ? voucherCount : 'N/A'}
                            </Typography>
                        )}
                    </div>
                </div>
            </DashboardCard>
        </Box>
    );
};

export default ReleaseVoucherStats;
import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Box, Typography, Select, MenuItem, SelectChangeEvent, useTheme } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import axios from 'axios';

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
        const fetchData = async () => {
          setLoading(true);
          setError(null);
          try {
            const token = localStorage.getItem('token');
            console.log("Token:", token);
            if (token == null) {
            setUsedVoucherCount(0);
              return;
            }
            const response = await axios.get(`/api/events/all`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            console.log("Registration successful:", response.data);
            const totalUsed = response.data.reduce((sum: number, campaign: any) => 
                sum + campaign.vouchers.reduce((vSum: number, voucher: any) => 
                  vSum + ((voucher.initQuantity || 0) - (voucher.currentQuantity || 0)), 0
                ), 0
              );
        
              setUsedVoucherCount(totalUsed);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
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
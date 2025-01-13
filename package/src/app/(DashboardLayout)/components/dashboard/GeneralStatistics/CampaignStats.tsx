import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Box, Typography, MenuItem, Select, SelectChangeEvent, useTheme } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const CampaignStats = () => {
    // Define a union type for valid time frames
    type TimeFrame = 'today' | 'week' | 'month' | 'year';
    const theme = useTheme();
    const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('today');
    const [total, setTotal] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: SelectChangeEvent<TimeFrame>) => {
        setTimeFrame(event.target.value as TimeFrame);
    };

    // Dummy data for campaigns
    const campaignData: Record<TimeFrame, number> = {
        today: 5,
        week: 20,
        month: 75,
        year: 300,
    };

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await fetch(`https://api.example.com/campaigns/total?timeFrame=${timeFrame}`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setTotal(result.total);
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
            <DashboardCard title="Campaign">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Select value={timeFrame} onChange={handleChange} size="small">
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="week">Week</MenuItem>
                            <MenuItem value="month">Month</MenuItem>
                            <MenuItem value="year">Year</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main}>
                Total: {total !== null ? total : 'N/A'}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DashboardCard>
    </Box>
  );
};
export default CampaignStats;

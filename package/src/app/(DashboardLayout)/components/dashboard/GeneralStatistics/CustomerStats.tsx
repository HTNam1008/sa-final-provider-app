import React, {useState, useEffect} from 'react';
import { CircularProgress, Grid, Box, Typography, Select, MenuItem, SelectChangeEvent, useTheme } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import axios from 'axios';

const CustomerStats = () => {
  // Define TimeFrame type
  type TimeFrame = 'today' | 'week' | 'month' | 'year';

  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('today');
  const theme = useTheme();
  const [customerTotal, setCustomerTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // // Mock data for customers
  // const customerData: Record<TimeFrame, number> = {
  //   today: 150,
  //   week: 850,
  //   month: 3200,
  //   year: 25000,
  // };

  const handleChange = (event: SelectChangeEvent<TimeFrame>) => {
    setTimeFrame(event.target.value as TimeFrame);
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        console.log("Token:", token);
        if (token == null) {
          setCustomerTotal(0);
          return;
        }

        const response = await axios.get(`api/events/all`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = response.data.length ?? 0;
        setCustomerTotal(result*2);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [timeFrame]);

  return (
    <Box
      sx={{
        boxShadow: theme.shadows[3],
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <DashboardCard title="Customer">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              value={timeFrame}
              onChange={handleChange}
              variant="outlined"
              size="small"
            >
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
                Total: {customerTotal !== null ? customerTotal : 'N/A'}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DashboardCard>
    </Box>
  );
};

export default CustomerStats;
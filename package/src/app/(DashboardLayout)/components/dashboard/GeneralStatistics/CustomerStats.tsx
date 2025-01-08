import React from 'react';
import { Grid, Box, Typography, Select, MenuItem, SelectChangeEvent, useTheme } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const CustomerStats = () => {
  // Define TimeFrame type
  type TimeFrame = 'today' | 'week' | 'month' | 'year';

  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('today');
  const theme = useTheme();

  // Mock data for customers
  const customerData: Record<TimeFrame, number> = {
    today: 150,
    week: 850,
    month: 3200,
    year: 25000,
  };

  const handleChange = (event: SelectChangeEvent<TimeFrame>) => {
    setTimeFrame(event.target.value as TimeFrame);
  };

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
            <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main}>
              Total: {customerData[timeFrame]}
            </Typography>
          </Grid>
        </Grid>
      </DashboardCard>
    </Box>
  );
};

export default CustomerStats;
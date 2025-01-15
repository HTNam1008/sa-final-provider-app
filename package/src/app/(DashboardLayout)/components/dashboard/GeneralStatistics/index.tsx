import React from 'react';
import { Grid } from '@mui/material';
import CampaignStats from './CampaignStats';
import CustomerStats from './CustomerStats';
import ReleaseVoucherStats from './ReleaseVoucherStats';
import UsedVoucherStats from './UsedVoucherStats';

const GeneralStatistics = () => {
  return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <CampaignStats />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomerStats />
        </Grid> 
        <Grid item xs={12} sm={6} md={3}>
          <ReleaseVoucherStats />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <UsedVoucherStats />
        </Grid>
      </Grid>
  );
};

export default GeneralStatistics;
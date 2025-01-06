import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DiscountChart from './DiscountChart';

// Define campaign type
type CampaignKey = 'campaign1' | 'campaign2' | 'campaign3';

// Define mock data type
const MOCK_DATA: Record<CampaignKey, number[]> = {
  'campaign1': [50, 30, 20, 15, 10],
  'campaign2': [45, 35, 25, 20, 15],
  'campaign3': [60, 40, 30, 25, 20],
};

const DiscountVoucher = () => {
  const [campaign, setCampaign] = useState<CampaignKey>('campaign1');

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Campaign</InputLabel>
          <Select
            value={campaign}
            label="Campaign"
            onChange={(e) => setCampaign(e.target.value as CampaignKey)}
          >
            <MenuItem value="campaign1">Tet Campaign</MenuItem>
            <MenuItem value="campaign2">Summer Campaign</MenuItem>
            <MenuItem value="campaign3">Christmas Campaign</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DiscountChart data={MOCK_DATA[campaign]} />
    </Box>
  );
};

export default DiscountVoucher;
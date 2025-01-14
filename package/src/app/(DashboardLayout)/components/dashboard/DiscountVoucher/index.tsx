import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography
} from '@mui/material';
import DiscountChart from './DiscountChart';

// Define campaign type
type CampaignKey = 'campaign1' | 'campaign2' | 'campaign3';

type CampaignData = Record<CampaignKey, number[]>;
// Define mock data type
// const MOCK_DATA: Record<CampaignKey, number[]> = {
//   'campaign1': [50, 30, 20, 15, 10],
//   'campaign2': [45, 35, 25, 20, 15],
//   'campaign3': [60, 40, 30, 25, 20],
// };

const DiscountVoucher = () => {
  const [campaign, setCampaign] = useState<CampaignKey>('campaign1');
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.example.com/campaigns/${campaign}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: CampaignData = await response.json();
        setData(result[campaign]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [campaign]);


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

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <DiscountChart data={data} />
      )}
    </Box>
  );
};
export default DiscountVoucher;
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
import VoucherChart from './VoucherChart';
import axios from 'axios';

interface Voucher {
  id: string;
  code: string;
  price: number;
  description: string;
  initQuantity: number;
  currentQuantity: number;
}

interface ApiCampaign {
  id: number;
  name: string;
  image: string | null;
  vouchers: Voucher[];
  start: string;
  endDate: string;
}

const VoucherStatistics = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [campaigns, setCampaigns] = useState<ApiCampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{
    labels: string[];
    released: number[];
    unused: number[];
  }>({
    labels: [],
    released: [],
    unused: []
  });

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<ApiCampaign[]>('/api/events/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCampaigns(response.data);
        if (response.data.length > 0) {
          setSelectedCampaign(response.data[0].id.toString());
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Update chart data when campaign changes
  useEffect(() => {
    if (selectedCampaign && campaigns.length > 0) {
      const campaign = campaigns.find(c => c.id.toString() === selectedCampaign);
      if (campaign) {
        const vouchersByPrice = campaign.vouchers.reduce((acc: { 
          [key: number]: { released: number; unused: number } 
        }, voucher) => {
          const price = voucher.price;
          if (!acc[price]) {
            acc[price] = { released: 0, unused: 0 };
          }
          acc[price].released += voucher.initQuantity;
          acc[price].unused += voucher.currentQuantity;
          return acc;
        }, {});

        const prices = Object.keys(vouchersByPrice).sort((a, b) => Number(a) - Number(b));
        
        setChartData({
          labels: prices.map(price => `${price}%`),
          released: prices.map(price => vouchersByPrice[Number(price)].released),
          unused: prices.map(price => vouchersByPrice[Number(price)].unused)
        });
      }
    }
  }, [selectedCampaign, campaigns]);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Campaign</InputLabel>
          <Select
            value={selectedCampaign}
            label="Campaign"
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            {campaigns.map((campaign) => (
              <MenuItem key={campaign.id} value={campaign.id.toString()}>
                {campaign.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      
      {loading ? (
        <CircularProgress />
      ) : (
        <VoucherChart data={chartData} />
      )}
    </Box>
  );
};

export default VoucherStatistics;


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
import axios from 'axios';

// Define campaign type
// type CampaignKey = 'campaign1' | 'campaign2' | 'campaign3';

// type CampaignData = Record<CampaignKey, number[]>;
// Define mock data type
// const MOCK_DATA: Record<CampaignKey, number[]> = {
//   'campaign1': [50, 30, 20, 15, 10],
//   'campaign2': [45, 35, 25, 20, 15],
//   'campaign3': [60, 40, 30, 25, 20],
// };

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

interface DiscountChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const DiscountVoucher = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [campaigns, setCampaigns] = useState<ApiCampaign[]>([]);
  const [chartData, setChartData] = useState<DiscountChartProps['data']>({
    labels: [],
    values: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get<ApiCampaign[]>('/api/events/all', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
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

    fetchEvents();
  }, []);

  // useEffect(() => {
  //   if (selectedCampaign && campaigns.length > 0) {
  //     const campaign = campaigns.find(c => c.id.toString() === selectedCampaign);
  //     if (campaign) {
  //       // Map voucher quantities to chart data
  //       const voucherData = campaign.vouchers.map(v => v.initQuantity);
  //       setChartData(voucherData);
  //     }
  //   }
  // }, [selectedCampaign, campaigns]);

  useEffect(() => {
    if (selectedCampaign && campaigns.length > 0) {
      const campaign = campaigns.find(c => c.id.toString() === selectedCampaign);
      if (campaign) {
        // Group vouchers by price and sum their initQuantities
        const vouchersByPrice = campaign.vouchers.reduce((acc: { [key: number]: number }, voucher) => {
          const price = voucher.price;
          acc[price] = (acc[price] || 0) + voucher.initQuantity;
          return acc;
        }, {});
  
        // Convert to arrays for chart
        const prices = Object.keys(vouchersByPrice).sort((a, b) => Number(a) - Number(b));
        const quantities = prices.map(price => vouchersByPrice[Number(price)]);
  
        setChartData({
          labels: prices.map(price => `${price}%`),
          values: quantities
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

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <DiscountChart data={chartData} />
      )}
    </Box>
  );
};

export default DiscountVoucher;
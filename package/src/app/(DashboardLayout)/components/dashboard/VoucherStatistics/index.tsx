import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import VoucherChart from './VoucherChart';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

// Mock Data
const MOCK_DATA = {
  'campaign1': {
    released: [100, 150, 200, 180, 220, 250],
    unused: [20, 30, 45, 50, 65, 80],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  'campaign2': {
    released: [80, 120, 160, 200, 180, 160],
    unused: [10, 20, 35, 45, 40, 30],
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  'campaign3': {
    released: [150, 180, 210, 240, 270, 300],
    unused: [30, 40, 50, 60, 70, 80],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
};

interface VoucherStats {
  released: number[];
  unused: number[];
  labels: string[];
}

const VoucherStatistics = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, 'month'));
  const [campaign, setCampaign] = useState<string>('campaign1');
  const [data, setData] = useState<VoucherStats>(MOCK_DATA['campaign1']);

  useEffect(() => {
    // Update data when campaign changes
    setData(MOCK_DATA[campaign as keyof typeof MOCK_DATA]);
  }, [campaign]);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Campaign</InputLabel>
          <Select
            value={campaign}
            label="Campaign"
            onChange={(e) => setCampaign(e.target.value)}
          >
            <MenuItem value="campaign1">Tet Campaign</MenuItem>
            <MenuItem value="campaign2">Summer Campaign</MenuItem>
            <MenuItem value="campaign3">Christmas Campaign</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            sx={{ width: 200 }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            sx={{ width: 200 }}
          />
        </LocalizationProvider>
      </Box>

      <VoucherChart 
        data={{ released: data.released, unused: data.unused }}
        labels={data.labels}
      />
    </Box>
  );
};

export default VoucherStatistics;


/* import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import VoucherChart from './VoucherChart';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface VoucherStats {
  released: number[];
  unused: number[];
  labels: string[];
}

const VoucherStatistics = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [campaign, setCampaign] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<VoucherStats>({
    released: [],
    unused: [],
    labels: [],
  });

  const fetchVoucherStats = async () => {
    if (!startDate || !endDate || !campaign) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/voucher-stats?campaign=${campaign}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Failed to fetch voucher statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoucherStats();
  }, [campaign, startDate, endDate]);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Campaign</InputLabel>
          <Select
            value={campaign}
            label="Campaign"
            onChange={(e) => setCampaign(e.target.value)}
          >
            <MenuItem value="campaign1">Campaign 1</MenuItem>
            <MenuItem value="campaign2">Campaign 2</MenuItem>
            <MenuItem value="campaign3">Campaign 3</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>
      </Box>

      {error && (
        <Box sx={{ color: 'error.main', mb: 2 }}>
          {error}
        </Box>
      )}

      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <VoucherChart 
          data={{ released: data.released, unused: data.unused }}
          labels={data.labels}
        />
      )}
    </Box>
  );
};

export default VoucherStatistics; */
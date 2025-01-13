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
import GameChart from './GameChart';

type CampaignKey = 'campaign1' | 'campaign2' | 'campaign3';

interface GameData {
  realtimeQuizz: number;
  lacXi: number;
}

// const MOCK_DATA: Record<CampaignKey, { realtimeQuizz: number; lacXi: number }> = {
//   'campaign1': {
//     realtimeQuizz: 150,
//     lacXi: 100,
//   },
//   'campaign2': {
//     realtimeQuizz: 200,
//     lacXi: 180,
//   },
//   'campaign3': {
//     realtimeQuizz: 120,
//     lacXi: 90,
//   },
// };

const GameStatistics = () => {
  const [campaign, setCampaign] = useState<CampaignKey>('campaign1');
  const [data, setData] = useState<GameData | null>(null);
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
        const result: GameData = await response.json();
        setData(result);
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
        data && <GameChart data={data} />
      )}
    </Box>
  );
};

export default GameStatistics;
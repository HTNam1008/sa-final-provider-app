import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import GameChart from './GameChart';

type CampaignKey = 'campaign1' | 'campaign2' | 'campaign3';

const MOCK_DATA: Record<CampaignKey, { realtimeQuizz: number; lacXi: number }> = {
  'campaign1': {
    realtimeQuizz: 150,
    lacXi: 100,
  },
  'campaign2': {
    realtimeQuizz: 200,
    lacXi: 180,
  },
  'campaign3': {
    realtimeQuizz: 120,
    lacXi: 90,
  },
};

const GameStatistics = () => {
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

      <GameChart data={MOCK_DATA[campaign]} />
    </Box>
  );
};

export default GameStatistics;
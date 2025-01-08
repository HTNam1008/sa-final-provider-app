import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton } from '@mui/material';
import { Campaign } from '../types';

interface CampaignTableProps {
  campaigns: Campaign[];
  onDelete: (id: string) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onDelete }) => {
  return (
    <Paper 
      elevation={3} 
      style={{ margin: '20px', borderRadius: '8px', overflow: 'hidden' }}
    >
      <TableContainer style={{
          border: '1px solid #ccc', 
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>
              <TableSortLabel>Start Date</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>End Date</TableSortLabel>
            </TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Initial</TableCell>
            <TableCell>Remaining</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.id}</TableCell>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.startDate}</TableCell>
              <TableCell>{campaign.endDate}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>{campaign.initial}</TableCell>
              <TableCell>{campaign.remaining}</TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'middle' }}>{campaign.paid ? '✔️' : '❌'}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(campaign.id)}>
                  🗑️
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default CampaignTable;
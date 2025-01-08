'use client'
import { useState } from 'react';
import { 
  Box, 
  Button,
  TextField,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

interface Payment {
  id: string;
  campaign: string;
  date: string;
  status: 'COMPLETED' | 'NOT COMPLETE';
  totalFee: number;
}

const PaymentPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'campaign', headerName: 'Campaign', width: 300 },
    { field: 'totalFee', headerName: 'Total Fee ($)', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton 
          onClick={() => handleDelete(params.row.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  // Sample data - replace with actual API call
  const rows: Payment[] = [
    {
      id: '1',
      campaign: 'Summer Campaign',
      date: '2024-01-01',
      status: 'COMPLETED',
      totalFee: 1000
    },
    // Add more sample data as needed
  ];

  const handleDelete = (id: string) => {
    console.log('Delete payment:', id);
    // Implement delete logic
  };

  const filteredRows = rows.filter(row =>
    row.campaign.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer title="Payments" description="Payment Management">
      <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography variant="h2" component="h1">
            Payment Management
          </Typography>
        </Stack>
      <Box sx={{ height: 600, width: '100%' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <TextField
            label="Search Payments"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Stack>
        
        <DataGrid
          rows={filteredRows}
          columns={columns}
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            '& .MuiDataGrid-columnHeaders': {
              fontWeight: 'bold',
              borderBottom: '2px solid #ddd',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </Box>
    </PageContainer>
  );
};

export default PaymentPage;
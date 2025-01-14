'use client'
import { useEffect, useState } from 'react';
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
import axios from 'axios';
// import router from 'next/router';

/* interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'ENDED' | 'NOT_ACCEPTED' | 'PENDING';
  initial: number;
  remaining: number;
  paid: boolean;
}

interface Voucher {
  id: string;
  code: string;
  qr: string;
  image: string;
  price: string;
  description: string;
  expired: string;
  status: string;
}

interface ApiCampaign {
  id: number;
  name: string;
  image: string | null;
  vouchers: Voucher[];
  start: string;
  endDate: string;
}

const CampaignPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/events/all', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Map API response to Campaign interface
        const mappedCampaigns: Campaign[] = response.data.map((item: ApiCampaign) => ({
          id: item.id.toString(),
          name: item.name,
          startDate: new Date(item.start).toLocaleDateString(),
          endDate: new Date(item.endDate).toLocaleDateString(),
          status: 'PENDING', // Set default or calculate based on dates
          initial: item.vouchers.reduce((sum, v) => sum + v.quantityV, 0),
          remaining: item.vouchers.reduce((sum, v) => sum + v.quantityR, 0),
          paid: true // Set default or get from API
        }));

        setCampaigns(mappedCampaigns);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'initial', headerName: 'Initial', width: 100 },
    { 
      field: 'remaining', 
      headerName: 'Remaining', 
      width: 130,
      renderCell: (params) => `${params.value}%` 
    },
    {
      field: 'paid',
      headerName: 'Paid',
      width: 100,
      renderCell: (params) => (
        params.value ? 
          <CheckCircleIcon color="success" /> : 
          <CancelIcon color="error" />
      )
    },
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
  const rows: Campaign[] = [
    {
      id: '1',
      name: 'Summer Campaign',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      status: 'PENDING',
      initial: 1000,
      remaining: 75,
      paid: true
    },
    // Add more sample data as needed
  ];

  const handleDelete = (id: string) => {
    console.log('Delete campaign:', id);
    // Implement delete logic
  };

  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); */

  interface Voucher {
    id: string;
    code: string;
    price: number;
    status: string;
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
  
  interface Campaign {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: 'ENDED' | 'NOT_ACCEPTED' | 'PENDING';
    initial: number;
    remaining: number;
    paid: boolean;
  }
  
  const CampaignPage = () => {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchCampaigns = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('/api/events/all', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          const mappedCampaigns: Campaign[] = response.data.map((item: ApiCampaign) => {
            // Calculate totals
            const totalInitial = item.vouchers.reduce((sum, v) => sum + v.initQuantity, 0);
            const totalCurrent = item.vouchers.reduce((sum, v) => sum + v.currentQuantity, 0);
            const remainingPercentage = totalInitial > 0 
              ? Math.round((totalCurrent / totalInitial) * 100)
              : 0;
  
            // Determine status based on dates
            const now = new Date();
            const endDate = new Date(item.endDate);
            let status: Campaign['status'] = 'PENDING';
            
            if (now > endDate) {
              status = 'ENDED';
            }
  
            return {
              id: item.id.toString(),
              name: item.name,
              startDate: new Date(item.start).toLocaleDateString(),
              endDate: new Date(item.endDate).toLocaleDateString(),
              status,
              initial: totalInitial,
              remaining: remainingPercentage,
              paid: true // Set default or get from API
            };
          });
  
          setCampaigns(mappedCampaigns);
        } catch (err) {
          console.error('Error fetching campaigns:', err);
          setError('Failed to load campaigns');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCampaigns();
    }, []);
  
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'startDate', headerName: 'Start Date', width: 130 },
      { field: 'endDate', headerName: 'End Date', width: 130 },
      { field: 'status', headerName: 'Status', width: 130 },
      { field: 'initial', headerName: 'Initial', width: 100 },
      { 
        field: 'remaining', 
        headerName: 'Remaining', 
        width: 130,
        renderCell: (params) => `${params.value}%` 
      },
      {
        field: 'paid',
        headerName: 'Paid',
        width: 100,
        renderCell: (params) => (
          params.value ? 
            <CheckCircleIcon color="success" /> : 
            <CancelIcon color="error" />
        )
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
          <IconButton 
            // onClick={() => handleDelete(params.row.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        )
      }
    ];

    const filteredRows = campaigns.filter(row =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  return (
    <PageContainer title="Campaigns" description="Campaign Management">
      <Box sx={{ height: 600, width: '100%' }}>
      <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography variant="h2" component="h1">
            Campaign Management
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <TextField
            label="Search Campaigns"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => router.push('/campaign/create')}
          >
            Create Campaign
          </Button>
        </Stack>
        
        <DataGrid
          rows={loading ? [] : filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          // disableSelectionOnClick
          loading={loading}
        />
      </Box>
    </PageContainer>
  );
};

export default CampaignPage;
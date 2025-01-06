'use client'
import { useState } from 'react';
import { 
  Box, 
  Button,
  TextField,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  Typography
} from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useRouter } from 'next/navigation';

interface Store {
  id: string;
  name: string;
  avatar: string;
  operatingHours: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
}

const StorePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [center, setCenter] = useState({ lat: 10.762622, lng: 106.660172 }); // Ho Chi Minh City

  // Sample data
  const stores: Store[] = [
    {
      id: '1',
      name: 'Store One',
      avatar: '/store1.jpg',
      operatingHours: '9:00 AM - 10:00 PM',
      description: 'Main branch store in District 1',
      location: { lat: 10.762622, lng: 106.660172 }
    },
    {
      id: '2',
      name: 'Store Two',
      avatar: '/store1.jpg',
      operatingHours: '9:00 AM - 10:00 PM',
      description: 'Main branch store in District 1',
      location: { lat: 10.8603735, lng: 106.7788311 }
    },
    // Add more sample stores
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDirections = (store: Store) => {
    setCenter(store.location);
    setSelectedStore(store);
  };

  const handleDelete = (id: string) => {
    console.log('Delete store:', id);
    // Implement delete logic
  };

  return (
    <PageContainer title="Stores" description="Store Management">
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push('/store/create')}
        >
          Create Store
        </Button>
      </Stack>

      <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 200px)' }}>
        {/* Google Maps */}
        <Paper sx={{ flex: 1 }}>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={13}
            >
              {stores.map(store => (
                <Marker
                  key={store.id}
                  position={store.location}
                  onClick={() => setSelectedStore(store)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </Paper>

        {/* Store List */}
        <Paper sx={{ flex: 1, p: 2 }}>
          <TextField
            fullWidth
            label="Search Stores"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          <List>
            {filteredStores.map((store) => (
              <ListItem
                key={store.id}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      edge="end"
                      onClick={() => handleDirections(store)}
                      color="primary"
                    >
                      <DirectionsIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(store.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemAvatar>
                  <Avatar src={store.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={store.name}
                  secondary={
                    <>
                      <Typography variant="body2">
                        Hours: {store.operatingHours}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {store.description}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </PageContainer>
  );
};

export default StorePage;
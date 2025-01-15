'use client'
import { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Paper,
  Typography,
  Autocomplete
} from '@mui/material';
import { LoadScript, Autocomplete as GoogleAutocomplete } from '@react-google-maps/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useRouter } from 'next/navigation';

interface StoreFormData {
  title: string;
  description: string;
  address: string;
  operatingHours: string;
  location: {
    lat: number;
    lng: number;
  };
}

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

export default function CreateStore() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState<StoreFormData>({
    title: '',
    description: '',
    address: '',
    operatingHours: '7:00 AM - 10:00 PM', // Default hours
    location: {
      lat: 10.762622,
      lng: 106.660172
    }
  });
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        setFormData({
          ...formData,
          address: place.formatted_address || '',
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // Create new store object
      const newStore: Store = {
        id: (Math.random() * 1000).toString(), // Generate random ID for mock
        name: formData.title,
        avatar: previewUrl || 'https://play-lh.googleusercontent.com/9YKe7pdnCi4yTe2EPtKxF4VlqDL_qDyaWTrQxNWBxEyZGBs-e4GgVhGHNxTTmNF9UQ',
        operatingHours: formData.operatingHours,
        description: formData.description,
        location: formData.location
      };

      // Get existing stores from localStorage or initialize empty array
      const existingStores = JSON.parse(localStorage.getItem('stores') || '[]');
      
      // Add new store
      const updatedStores = [...existingStores, newStore];
      
      // Save to localStorage
      localStorage.setItem('stores', JSON.stringify(updatedStores));

      router.push('/store');
    } catch (error) {
      console.error('Error creating store:', error);
    }
  };

  return (
    <PageContainer title="Create Store" description="Create a new store">
      <Box component="form" noValidate sx={{ mt: 1, maxWidth: 600, mx: 'auto' }}>
        <Stack spacing={3}>
          {/* Image Upload */}
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2} alignItems="center">
              {previewUrl && (
                <Box
                  component="img"
                  src={previewUrl}
                  sx={{ width: 200, height: 200, objectFit: 'cover'}}
                />
              )}
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ width: '100%' }}
              >
                Upload Store Avatar
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Stack>
          </Paper>

          {/* Store Information */}
          <TextField
            required
            fullWidth
            label="Store Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* Google Places Autocomplete */}
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
            libraries={['places']}
          >
            <GoogleAutocomplete
              onLoad={setAutocomplete}
              onPlaceChanged={handlePlaceSelect}
            >
              <TextField
                required
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </GoogleAutocomplete>
          </LoadScript>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Create Store
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  );
}
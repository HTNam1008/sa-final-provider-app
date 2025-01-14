import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress 
} from '@mui/material';
import axios from 'axios';

interface OTPDialogProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

const OTPDialog = ({ open, onClose, email }: OTPDialogProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/auth/verify', { 
        email,
        otp 
      });
      onClose();
      // Redirect to login page
      window.location.href = '/authentication/login';
    } catch (err) {
      setError('Invalid OTP code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Verification Code</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography gutterBottom>
            Please enter the verification code sent to {email}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="OTP Code"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Verify'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OTPDialog;
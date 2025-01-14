import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UpdateProfileType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface ProfileData {
  name: string;
  industry: string;
  address: string;
  gpsLat: string;
  gpsLong: string;
}

const AuthUpdateProfile = ({ title, subtitle, subtext }: UpdateProfileType) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    industry: "",
    address: "",
    gpsLat: "",
    gpsLong: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mounted) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.put("/api/profile/update", formData);
      router.push("/profile");
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <CircularProgress />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}
      {subtext}
      <Stack spacing={2}>
        {Object.keys(formData).map((field) => (
          <Box key={field}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor={field}
              mb="5px"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Typography>
            <TextField
              name={field}
              value={formData[field as keyof ProfileData]}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              data-testid={`${field}-input`}
            />
          </Box>
        ))}
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Stack>
      <Box mt={2}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={loading}
          data-testid="submit-button"
        >
          {loading ? <CircularProgress size={24} /> : "Update Profile"}
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthUpdateProfile;

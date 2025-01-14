// AuthLogin.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface LoginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface LoginData {
  email: string;
  password: string;
}

const AuthLogin = ({ title, subtitle, subtext }: LoginType) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
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
      const response = await axios.post("/api/auth/login", formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      router.push("/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <CircularProgress />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            data-testid="email-input"
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            data-testid="password-input"
          />
        </Box>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={loading}
          data-testid="submit-button"
        >
          {loading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
// import React from "react";
// import {
//   Box,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Button,
//   Stack,
//   Checkbox,
// } from "@mui/material";
// import Link from "next/link";

// import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

// interface loginType {
//   title?: string;
//   subtitle?: JSX.Element | JSX.Element[];
//   subtext?: JSX.Element | JSX.Element[];
// }

// const AuthLogin = ({ title, subtitle, subtext }: loginType) => (
//   <>
//     {title ? (
//       <Typography fontWeight="700" variant="h2" mb={1}>
//         {title}
//       </Typography>
//     ) : null}

//     {subtext}

//     <Stack>
//       <Box>
//         <Typography
//           variant="subtitle1"
//           fontWeight={600}
//           component="label"
//           htmlFor="username"
//           mb="5px"
//         >
//           Username
//         </Typography>
//         <CustomTextField variant="outlined" fullWidth />
//       </Box>
//       <Box mt="25px">
//         <Typography
//           variant="subtitle1"
//           fontWeight={600}
//           component="label"
//           htmlFor="password"
//           mb="5px"
//         >
//           Password
//         </Typography>
//         <CustomTextField type="password" variant="outlined" fullWidth />
//       </Box>
//       <Stack
//         justifyContent="space-between"
//         direction="row"
//         alignItems="center"
//         my={2}
//       >
//         <FormGroup>
//           <FormControlLabel
//             control={<Checkbox defaultChecked />}
//             label="Remeber this Device"
//           />
//         </FormGroup>
//         <Typography
//           component={Link}
//           href="/"
//           fontWeight="500"
//           sx={{
//             textDecoration: "none",
//             color: "primary.main",
//           }}
//         >
//           Forgot Password ?
//         </Typography>
//       </Stack>
//     </Stack>
//     <Box>
//       <Button
//         color="primary"
//         variant="contained"
//         size="large"
//         fullWidth
//         component={Link}
//         href="/"
//         type="submit"
//       >
//         Sign In
//       </Button>
//     </Box>
//     {subtitle}
//   </>
// );

// export default AuthLogin;

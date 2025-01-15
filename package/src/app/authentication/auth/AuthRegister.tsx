import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from '@mui/material';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import axios from "axios";
import OTPDialog from "./AuthVerifyOTP";


interface RegisterType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const AuthRegister = ({ title, subtitle, subtext }: RegisterType) => {
  const [openOTP, setOpenOTP] = useState(false);

  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    role: "brand",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/register", formData);
      console.log("Registration successful:", response.data);
      setOpenOTP(true);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        <Box>
          <Stack mb={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Name
            </Typography>
            <CustomTextField
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
              mt="25px"
            >
              Email Address
            </Typography>
            <CustomTextField
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
              mt="25px"
            >
              Password
            </Typography>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Stack>
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Box>
        {subtitle}
      </form>

      <OTPDialog
        open={openOTP}
        onClose={() => setOpenOTP(false)}
        email={formData.email}
      />
    </>
  );
};

export default AuthRegister;
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         {title ? (
//           <Typography fontWeight="700" variant="h2" mb={1}>
//             {title}
//           </Typography>
//         ) : null}

//         {subtext}

//         <Box>
//           <Stack mb={3}>
//             <Typography
//               variant="subtitle1"
//               fontWeight={600}
//               component="label"
//               htmlFor="name"
//               mb="5px"
//             >
//               Name
//             </Typography>
//             <CustomTextField
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//             />

//             <Typography
//               variant="subtitle1"
//               fontWeight={600}
//               component="label"
//               htmlFor="email"
//               mb="5px"
//               mt="25px"
//             >
//               Email Address
//             </Typography>
//             <CustomTextField
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//             />

//             <Typography
//               variant="subtitle1"
//               fontWeight={600}
//               component="label"
//               htmlFor="password"
//               mb="5px"
//               mt="25px"
//             >
//               Password
//             </Typography>
//             <CustomTextField
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//             />
//           </Stack>
//           {error && (
//             <Typography color="error" mt={2}>
//               {error}
//             </Typography>
//           )}
//           <Button
//             color="primary"
//             variant="contained"
//             size="large"
//             fullWidth
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : "Sign Up"}
//           </Button>
//         </Box>
//         {subtitle}
//       </form>

//       <OTPDialog
//         open={openOTP}
//         onClose={() => setOpenOTP(false)}
//         email={formData.email}
//       />
//     </>
//   );
// };

// export default AuthRegister;
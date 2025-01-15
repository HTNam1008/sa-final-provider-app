"use client";
import React from "react";
import { Grid, Box, Card, Stack, Typography, TextField, Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthUpdateProfile from "../auth/AuthUpdate";

const UpdateProfile = () => {
  return (
    <PageContainer title="Update Profile" description="This is the update profile page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.1", // Adjust opacity for a softer background
          },
        }}
      >
        <Grid
          container
          spacing={2}  // Increased spacing for better visual separation
          justifyContent="center"
          sx={{ height: "100vh", padding: 2 }}  // Add padding for better spacing around the container
        >
          <Grid
            item
            xs={12}
            sm={8}  // Adjusted for larger screen widths
            md={6}  // Adjusted for medium screen widths
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              sx={{
                padding: 3,
                boxShadow: 3, // Added shadow for depth
                width: "100%", // Ensure the card takes up full width of the grid
                maxWidth: 500, // Optional: Limit max width for better design
              }}
            >
              <AuthUpdateProfile
                subtext={
                  <Typography
                    variant="h5"
                    textAlign="center"
                    color="textPrimary"
                    mb={2}
                    fontWeight="bold"
                  >
                    Update your profile details
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      Back to
                    </Typography>
                    <Typography
                      component="a"
                      href="/dashboard"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Dashboard
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default UpdateProfile;

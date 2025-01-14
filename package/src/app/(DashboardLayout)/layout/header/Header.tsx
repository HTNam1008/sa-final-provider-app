import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import axios from 'axios';

interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

interface ProfileData {
  id: string | null;
  name: string | null;
  industry: string | null;
  address: string | null;
  gps_lat: string | null;
  gps_long: string | null;
  status: string | null;
  // add other profile fields as needed
}

const Header = ({toggleMobileSidebar}: ItemType) => {
  const [profileName, setProfileName] = useState<string>("New User");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      const id = localStorage.getItem('id');
      
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/users/${id}/profile/brand`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          },
        );
        setProfile(response.data);
        setProfileName(response.data.name || "New User");
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>


        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>

        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {!loading && (
            <Button 
              variant="contained" 
              component={Link} 
              href={profileName == "New User" ? "/authentication/updateProfile" : "/authentication/login"}     
              disableElevation 
              color="primary"
            >
              {profileName || "Login"} 
            </Button>
          )}
          {/* {profile && <Profile profileData={profile} />} */}
           <Profile/>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};
// }
export default Header;

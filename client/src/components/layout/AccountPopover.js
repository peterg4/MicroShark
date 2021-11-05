import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
import { logout } from '../../actions/auth';
// components
import MenuPopover from './MenuPopover';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/'
  },
  {
    label: 'Profile',
    linkTo: '#'
  }
];

// ----------------------------------------------------------------------

export const AccountPopover = ({ 
  logout, 
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
  }) => {
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);


  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    logout();
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main' }}>{user ? user.firstName[0] : <AccountCircleIcon />}</Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'common.white' }} noWrap>
          {user ? user.firstName + ' ' + user.lastName : 'Guest'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {user ? user.email : ''}
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: 'common.white', my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ color: 'common.white', typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth variant="outlined" onClick={handleClick}>
             Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}


AccountPopover.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logout, getCurrentProfile }
)(AccountPopover);

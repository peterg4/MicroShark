import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// components
import Scrollbar from './Scrollbar';
import NavSection from './NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import { getCurrentProfile } from '../../actions/profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper
}));

// ----------------------------------------------------------------------

export const DashboardSidebar = ({ 
  isOpenSidebar, 
  onCloseSidebar,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
  }) => {
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Typography variant="h3" sx={{ color: 'common.white' }}>
               MicroShark
            </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{user ? user.firstName[0] : <AccountCircleIcon />}</Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.dark' }}>
              {user ? user.firstName + ' ' + user.lastName : 'Guest'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.dark' }}>
              {user ? user.email : ''}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      <NavSection navConfig={sidebarConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(DashboardSidebar);
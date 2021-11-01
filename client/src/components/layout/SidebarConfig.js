import { Icon } from '@iconify/react';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';


// ----------------------------------------------------------------------

//const getIcon = (name) => < width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Scan',
    path: '/',
    icon: <QrCodeScannerIcon />,
    checkauth: '0'
  },
  {
    title: 'Admin',
    path: '/dashboard',
    icon: <PeopleIcon />,
    checkauth: '1'
  },
  {
    title: 'login',
    path: '/login',
    icon: <LoginIcon />,
    checkauth: '2'
  },
  {
    title: 'register',
    path: '/register',
    icon: <PersonAddAlt1Icon />,
    checkauth: '2'
  }
];

export default sidebarConfig;

import LockOpenIcon from '@mui/icons-material/LockOpen';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------



export default function PIIConcerns() {
  const [count, setCount] = useState(0);
    axios.get(`/api/passports/`)
    .then(res => {
        setCount(res.data.SecurityRisks);
    })
  return (
    <RootStyle>
      <IconWrapperStyle>
        <LockOpenIcon />
      </IconWrapperStyle>
      <Typography variant="h3">{count}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Security Threats
      </Typography>
    </RootStyle>
  );
}

import SourceIcon from '@mui/icons-material/Source';
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
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 3;

export default function DataSources() {
  const [count, setCount] = useState(0);
    axios.get(`/api/passports/`)
    .then(res => {
        setCount(res.data.DataSources);
    })
  return (
    <RootStyle>
      <IconWrapperStyle>
        <SourceIcon />
      </IconWrapperStyle>
      <Typography variant="h3">{count}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Data Sources
      </Typography>
    </RootStyle>
  );
}
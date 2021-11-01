import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import Page from './Page';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import axios from 'axios';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
//react-webcam-barcode-scanner
//css-1byr0tz

function BarcodeWebcam() {
  const [ data, setData ] = React.useState('');
  const [ result, setResult ] = React.useState('');
  return (
    <>
      <BarcodeScannerComponent
        width={'100%'}
        height={'100%'}
        onUpdate={(err, result) => {
          if (result) {
            //check if this entry is same as last one -- if diff make the get REQ
            setData(result.text)
            axios.get(`/api/products/`, {params: { code: result.text } })
            .then(res => {
                console.log(res.data)
                if(res.data) {
                  if(res.data.hasPlastics == "0") {
                    console.log("nonefound")
                    setResult("No Plastics Detected!");
                  } else if(res.data.hasPlastics == "1") {
                    console.log("somefound")
                    setResult("Microplastics Detected!");
                  } else if(res.data.hasPlastics == "2") {
                    console.log("unkownfound")
                    setResult("Item Not in Database.");
                  }
                }
            })
            console.log(result.text);
          } else setData('')
        }}
      />
      <div className="result">{data}</div>
      {result == "No Plastics Detected!" &&
        <Box className="result good"> 
          <Typography variant="h4" sx={{ color: 'text.success.main' }}><CheckBoxIcon /> {result}</Typography>
        </Box>
      }
      {result == "Microplastics Detected!" &&
        <Box className="result bad"> 
          <Typography variant="h4" sx={{ color: 'text.success.main' }}><CancelIcon /> {result}</Typography>
        </Box>
      }
      {result == "Item Not in Database." &&
        <Box className="result unknown"> 
          <Typography variant="h4" sx={{ color: 'text.success.main' }}><HelpIcon /> {result}</Typography>
        </Box>
      }
    </>
  )
}

const Landing = ({ isAuthenticated }) => {
return (
    <BarcodeWebcam />
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

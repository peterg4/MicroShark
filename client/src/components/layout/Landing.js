import React, { useEffect, useState } from 'react';
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
import Scanner from "./Scanner";

function BarcodeWebcam(props) {
  const [ data, setData ] = React.useState({});
  const [ results, setResult ] = React.useState('');
  const [last, setLast ] = React.useState('start');
  useEffect(() => {
    if(data.text && data.text != last) {
    setLast(data.text)
    console.log(data)
    axios.get(`/api/products/`, {params: { code: data.text } })
    .then(res => {
        if(res.data) {
          if(res.data.hasPlastics == "0") {
            setResult("No Plastics Detected!");
          } else if(res.data.hasPlastics == "1") {
            setResult("Microplastics Detected!");
          } else if(res.data.hasPlastics == "2") {
            setResult("Item Not in Database.");
          }
        }
        if(props.auth) {
          console.log(props.auth.email);
          axios.post('/api/users/insert', {params: { email: props.auth.email,
                                                    result: data,
                                                    name: res.data.code,
                                                    hasPlastics: res.data.hasPlastics } });
        }
    })}
  }, [data]);
  return (
    <>
      <BarcodeScannerComponent
        width={'100%'}
        height={'100%'}
        overflow={'hidden'}
        onUpdate={(err, result) => {
          if (result) {
            console.log(data);
            if(result.text == data.text) return;
            if(!result.text) return;
            //check if this entry is same as last one -- if diff make the get REQ
            setData(result);

          }
        }}
      />
      <div className="result">{data.text}</div>
      {results == "No Plastics Detected!" &&
        <Box className="result good"> 
          <Typography variant="h4" sx={{ color: 'text.success.main' }}>
            <CheckBoxIcon className="resIcon" /> {results}
          </Typography>
        </Box>
      }
      {results == "Microplastics Detected!" &&
        <Box className="result bad"> 
          <Typography variant="h4" sx={{ color: 'text.success.main' }}>
            <CancelIcon className="resIcon"/> {results}
          </Typography>
        </Box>
      }
      {results == "Item Not in Database." &&
        <Box className="result unknown"> 
          <Typography variant="h4" sx={{ color: 'text.success.main' }}>
            <HelpIcon className="resIcon"/> {results}
          </Typography>
        </Box>
      }
    </>
  )
}
///*<BarcodeWebcam auth={user} style={{overflow: 'hidden'}}/>*/}
const Landing = ({ auth: { user } }) => {
  const [camera, setCamera] = useState(true);
  const [result, setResult] = useState(null);

  const onDetected = result => {
    setResult(result);
    console.log(result);
  };
return (
    <Container>
    {camera && <Scanner onDetected={onDetected} />}
    </Container>
  );
};

Landing.propTypes = {
  auth: PropTypes.object
  
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);

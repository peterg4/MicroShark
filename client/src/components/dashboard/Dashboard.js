import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Typography, Button, Box, Grid, Container } from '@mui/material';
import axios from 'axios';
import Page from '../layout/Page';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [persons, setPersons] = useState({});
  function changeState(data) {
    axios.get(`/api/products`)
    .then(res => {
      let data = res.data;
      setPersons(data);
    })
  }
  let keys = Object.keys(persons)
  let arr = [];
  const data_fields = keys.forEach(function(key){
    if(typeof persons[key] === 'object') {
      console.log(persons[key]);
      arr.push(JSON.stringify(persons[key]))
    } else {
      arr.push(persons[key]);
    }
  });

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Page title="Administration Dashboard">
      <Container maxWidth="xl">
      <Box sx={{ pb: 5 }}>
          <Typography variant="h4" sx={{ color: 'text.primary' }}>Welcome to the Admin Dashboard!</Typography>
          <Typography variant="subtitle" sx={{ color: 'text.disabled'}}>
            <i className='fas fa-user' /> Welcome {user && user.firstName}
          </Typography>
          <Button onClick={changeState}>Edit Pass Entry</Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={10}>
        </Grid>
          
        <Grid container spacing={3} item xs={12} md={6} lg={2} style={{ height: "100%" }}>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} lg={2} style={{ height: "100%" }}>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
        </Grid>
      </Grid>
    </Container>
  </Page>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
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
)(Dashboard);

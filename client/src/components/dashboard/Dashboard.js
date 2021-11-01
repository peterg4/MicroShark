import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Typography, Button, Box, Grid, Container, Stack, TextField } from '@mui/material';
import axios from 'axios';
import Page from '../layout/Page';
import { useFormik, Form, FormikProvider } from 'formik';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { LoadingButton } from '@mui/lab';

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


  const formik = useFormik({
    initialValues: {
      code: '',
      hasPlastics: '',
      prodName: ''
    },
    onSubmit: async e => {
      console.log(e);
      //axios post the e
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Page title="Administration Dashboard">
      <Container maxWidth="xl">
      <Box sx={{ mt: 20, pb: 5 }}>
          <Typography variant="h4" sx={{ color: 'text.dark' }}>Welcome to your profile!</Typography>
          <Typography variant="subtitle" sx={{ color: 'text.disabled'}}>
            <i className='fas fa-user' /> Welcome {user && user.firstName}
          </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <FormikProvider value={formik}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h3" sx={{ color: 'text.dark' }}>Enter Product</Typography>
              <Typography variant="subtitle" sx={{ color: 'text.disabled'}}>
                <AddTaskIcon /> Add a Product to the Database!
              </Typography>
            </Box>
            <Form onSubmit={e => handleSubmit(e)}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    className = "textfcolor"
                    label="Code"
                    {...getFieldProps('code')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextField
                    className = "textfcolor"
                    fullWidth
                    label="Has Plastics?"
                    {...getFieldProps('hasPlastics')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Product Name"
                  {...getFieldProps('prodName')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Add Product
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
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

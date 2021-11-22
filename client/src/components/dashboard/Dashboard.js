import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Typography, Button, Box, Grid, Container, Stack, TextField, MenuItem  } from '@mui/material';
import axios from 'axios';
import Page from '../layout/Page';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HistoryIcon from '@mui/icons-material/History';
import { LoadingButton } from '@mui/lab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';


const plastics = [
  {
    value: '1',
    label: 'Yes'
  },
  {
    value: '0',
    label: 'No'
  }
]

const exportData = (data) => {
  let csvData = [["Plastic","Name","Timestamp"]];
  data.forEach((val) => {
    csvData.push([val[0], val.text, val.timestamp])
  });
  console.log(csvData);
  let csvContent = "data:text/csv;charset=utf-8," 
    + csvData.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  console.log(encodedUri)
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  document.body.appendChild(link); // Required for FF

  link.click();
}

const toDate = (time) => {
  let dateTime = new Date(time)
  return dateTime.toISOString();
}
const genIcon = (val) => {
  if(val == "0") return <CheckBoxIcon/>
  if(val == "1") return <CancelIcon />
  if(val == "2") return <HelpIcon /> 
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  width: '100%'
}));

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
      if(e.code == '') return;
      axios.post('/api/products', {
        code: e.code,
        hasPlastics: e.hasPlastics,
        prodName: e.prodName
      })
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return profile === null ? (
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
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={6}>
          <FormikProvider value={formik}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h3" sx={{ color: 'text.dark' }}>Enter Product</Typography>
              <Typography variant="subtitle" sx={{ color: 'text.disabled'}}>
                <AddTaskIcon style={{verticalAlign: "middle"}}/> Add a Product to the Database!
              </Typography>
            </Box>
            <Form onSubmit={e => handleSubmit(e)}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    variant="filled"
                    fullWidth
                    className = "textfcolor"
                    label="Code"
                    {...getFieldProps('code')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextField
                    variant="filled"
                    className = "textfcolor"
                    select
                    value={plastics}
                    fullWidth
                    label="Has Plastics?"
                    {...getFieldProps('hasPlastics')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  > {plastics.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}</TextField>
                </Stack>

                <TextField
                  variant="filled"
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
          
        <Grid item container spacing={3} item xs={6} md={6} lg={6} style={{ height: "100%" }}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Scan History <Button onClick={() => {exportData(profile.history)}}>Export</Button>
            </Typography>
            <Demo>
              <List>
                {profile.history.map((val) => (
                  <ListItem key={val.timestamp} secondaryAction={genIcon(val[0])}>
                    <ListItemText primary={`${val.text}`}
                                  secondary={toDate(val.timestamp)}
                                  style={{overflowWrap: 'break-word'}}/>
                  </ListItem>
                ))}
              </List>
            </Demo>
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

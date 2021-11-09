import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, IconButton, InputAdornment, Icon, Container, Typography, Box } from '@mui/material';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });
  const { firstName,lastName, email, password, password2 } = formData;

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    password2: Yup.string().required('Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: ''
    },
    validationSchema: RegisterSchema,
    onChange: e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    onSubmit: async e => {
      if (e.password !== e.password2) {
        setAlert('Passwords do not match', 'danger');
      } else {
        let obj = {
          firstName: e.firstName, 
          lastName: e.lastName,
          email: e.email,
          password: e.password
        }
        console.log(obj)
        register(obj);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  if (isAuthenticated) {
   return <Redirect to='/dashboard' />;
  }

  return (
    <Container maxWidth="sm" style={ {position: `absolute`, top: '50%', left: '50%', transform: `translate(-50%, -50%)`} }>
    <FormikProvider value={formik}>
      <Box sx={{ mt: '0px', mb: 3 }}>
        <Typography variant="h3" sx={{ color: 'text.dark' }}>Sign Up</Typography>
        <Typography variant="subtitle" sx={{ color: 'text.disabled'}}>
          <i className='fas fa-user' /> Sign Into Your Account
        </Typography>
      </Box>
      <Form onSubmit={e => handleSubmit(e)}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              variant="filled"
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
             variant="filled"
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            variant="filled"
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            variant="filled"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? VisibilityIcon : VisibilityOffIcon} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            variant="filled"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('password2')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? VisibilityIcon : VisibilityOffIcon} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
      <Typography variant="subtitle" sx={{ color: 'text.dark' }}>
        Already have an account? <Link to='/login'>Sign In</Link>
      </Typography>
    </FormikProvider>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);

import React, { Fragment, useState } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Box,
  Container,
  Typography,
  Icon
} from '@mui/material';
//import Typography from '../../theme/overrides/Typography';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onChange: e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    onSubmit: async e => {
      login(e.email, e.password);
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container maxWidth="sm">
    <FormikProvider value={formik}>
      <Box sx={{ mt: '40%', mb: 3 }}>
      <Typography variant="h3" sx={{ color: 'text.dark' }}>Sign In</Typography>
      <Typography variant="subtitle" sx={{ color: 'text.disabled'}}>
        <i className='fas fa-user' /> Sign Into Your Account
      </Typography>
      </Box>
      <Form onSubmit={handleSubmit}>
      <Stack spacing={3}>
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
            variant="filled"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? VisibilityIcon : VisibilityOffIcon} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label={<Typography variant="subtitle" sx={{ color: 'text.disabled'}}>Remember me</Typography>}
          />
        
          <Link to='/register' variant="subtitle2" to="#">
              Forgot password?
          </Link>
        
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
      <Typography variant="subtitle" sx={{ color: 'text.dark' }}>
        Don't have an account? <Link to='/register'> Sign Up </Link>
      </Typography>
    </FormikProvider>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);

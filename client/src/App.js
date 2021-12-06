import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { styled } from '@mui/material/styles';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import DashboardNavbar from './components/layout/DashboardNavbar';
import DashboardSidebar from './components/layout/DashboardSidebar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  height: '100vh'
});

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  height: 'fit-content'
}));


function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </MainStyle>
    </RootStyle>
  );
}
 

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <ThemeConfig>
      <GlobalStyles />
      <Provider store={store}>
        <Router>
        <DashboardLayout />
        </Router>
      </Provider>
    </ThemeConfig>
  );
};

export default App;

import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import defaultTheme from '../../theme';
import AppDrawer from '../AppDrawer';

const AppLayout = () => {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <div className="main">
        <AppDrawer />
        <Outlet />
      </div>
    </MuiThemeProvider>
  );
};

export default AppLayout;

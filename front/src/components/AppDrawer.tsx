import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';

import Channels from './Channels';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    drawerPaper: {
      position: 'fixed',
      height: '100%',
      backgroundColor: palette.primary.main,
      overflow: 'hidden',
    },
  })
);

const AppDrawer = () => {
  const classes = useStyles();
  return (
    <Drawer
      open
      variant="persistent"
      classes={{
        paper: classNames(classes.drawerPaper),
      }}
    >
      <Channels />
    </Drawer>
  );
};

export default AppDrawer;

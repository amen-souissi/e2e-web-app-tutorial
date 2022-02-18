import * as React from 'react';
import { createStyles } from '@material-ui/core/styles';
import { makeStyles, Typography } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

import { STYLE_CONST } from '../../constants';

const useStyles = makeStyles(
  createStyles({
    app: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 100,
      marginLeft: STYLE_CONST.drawerWidth,
      fontSize: 45,
      fontWeight: 900,
    },
  })
);

const Home = () => {
  const classes = useStyles();

  return (
    <Typography className={classes.app}>
      Hello!
      <ChatIcon fontSize="large" />
    </Typography>
  );
};

export default Home;

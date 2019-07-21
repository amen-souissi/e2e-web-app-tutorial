import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { createStyles } from "@material-ui/core/styles";
import { AppBar, makeStyles, Toolbar, IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import { STYLE_CONST } from "../../constants";
import { updateCurrentChannel } from "../../redux/actions";
import Comments from "../Comments";
import { goToHome } from "../../utils/routeMap";

const useStyles = makeStyles(
  createStyles({
    app: {
      display: "block",
      marginLeft: STYLE_CONST.drawerWidth
    },
    appBar: {
      backgroundColor: "white"
    },
    toolBar: {
      display: "flex",
      flexDirection: "row-reverse"
    },
    main: {
      width: "100%",
      flexGrow: 1,
      fontFamily:
        '"LatoWebMedium", "Helvetica Neue", Helvetica, Arial, sans-serif',
      letterSpacing: 0.3,
      marginLeft: 0
    }
  })
);

interface Props extends RouteComponentProps<{ channelId: string }> {
  updateCurrentChannel: (channelid?: string) => void;
}

const App = ({
  match: {
    params: { channelId }
  },
  updateCurrentChannel
}: Props) => {
  const classes = useStyles();

  React.useEffect(() => {
    updateCurrentChannel(channelId);
    return updateCurrentChannel;
  }, [channelId, updateCurrentChannel]);

  return (
    <div className={classes.app}>
      <AppBar
        classes={{ root: classes.appBar }}
        position="static"
        elevation={2}
      >
        <Toolbar className={classes.toolBar}>
          <IconButton onClick={goToHome} color="primary">
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Comments channelId={channelId} />
      </main>
    </div>
  );
};

const mapDispatchToProps = {
  updateCurrentChannel: updateCurrentChannel
};

export default connect(
  null,
  mapDispatchToProps
)(App);

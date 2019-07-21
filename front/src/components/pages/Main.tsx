import * as React from "react";
import { Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import defaultTheme from "../../theme";
import App from "./App";
import Home from "./Home";
import AppDrawer from "../AppDrawer";

const Main = () => {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <div className="main">
        <AppDrawer />
        <Route exact path="/" component={Home} />
        <Route path="/messages/:channelId" component={App} />
      </div>
    </MuiThemeProvider>
  );
};

export default Main;

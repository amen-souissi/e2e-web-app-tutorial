import * as React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { Provider as ReduxProvider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import * as serviceWorker from "./serviceWorker";
import getApolloClient from "./apollo-client";
import createAppStore from "./redux/store";
import defaultTheme from "./theme";
import routes from "./routes";

const store = createAppStore();

const apolloClient = getApolloClient();

export const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ApolloHooksProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <MuiThemeProvider theme={defaultTheme}>
          <Router history={history}>{routes}</Router>
        </MuiThemeProvider>
      </ReduxProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

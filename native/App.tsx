import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider as ReduxProvider } from "react-redux";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import getApolloClient from "./src/apollo-client";
import createAppStore from "./src/redux/store";
import AppDrawer from "./src/components/AppDrawer";

const store = createAppStore();

const apolloClient = getApolloClient();

export default function App() {
  const [ready, setReady] = React.useState(false);
  //@ts-ignore
  React.useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font
      });
      setReady(true);
    };
    loadFont();
  }, []);

  return ready ? (
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <AppDrawer />
      </ReduxProvider>
    </ApolloProvider>
  ) : null;
}

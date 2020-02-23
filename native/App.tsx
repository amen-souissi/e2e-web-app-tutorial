import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import { Provider as ReduxProvider } from "react-redux";
import I18n from "react-native-i18n";
import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";

import getApolloClient from "./src/apollo-client";
import createAppStore from "./src/redux/store";
import AppDrawer from "./src/components/AppDrawer";
import { LOCALES_MAPPING } from "./src/utils/i18n";
import { NavigationContext } from "./src/contexts";

const store = createAppStore();

const apolloClient = getApolloClient();

const appInitialization = async (callback: () => void) => {
  // load assets
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font
  });
  // load locale
  const { locale } = await Localization.getLocalizationAsync();
  I18n.locale = LOCALES_MAPPING[locale] || locale;
  callback();
};

export default function App() {
  const navigationContainer = React.useRef(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const initialization = async () => {
      await appInitialization(() => setReady(true));
    };
    initialization();
  }, []);

  return ready ? (
    <NavigationContainer ref={navigationContainer}>
      <NavigationContext.Provider value={{ navigationContainer }}>
        <ApolloProvider client={apolloClient}>
          <ReduxProvider store={store}>
            <AppDrawer />
          </ReduxProvider>
        </ApolloProvider>
      </NavigationContext.Provider>
    </NavigationContainer>
  ) : null;
}

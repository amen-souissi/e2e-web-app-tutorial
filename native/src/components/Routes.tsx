import * as React from "react";
import { StyleSheet } from "react-native";
import { Text } from "native-base";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import Comments, { CommentsScreenRouteProp } from "./Comments";
import Home from "./Home";
import ChannelsBtn from "./ChannelsBtn";

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Comments: { channelId: string; channelTitle: string };
};

function Routes() {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={({ route }) => ({
          headerTitle: () => (
            <Text style={styles.title}>{(route as CommentsScreenRouteProp).params.channelTitle}</Text>
          )
        })}
      />
    </Stack.Navigator>
  );
}

const options: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#4D394B"
  },
  headerTintColor: "#fff",
  headerRight: () => <ChannelsBtn />
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: options.headerTintColor
  }
});

export default Routes;

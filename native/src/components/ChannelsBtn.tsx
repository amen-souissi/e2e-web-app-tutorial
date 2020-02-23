import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "native-base";

import { DrawerContext } from "../contexts";

export default function ChannelsBtn() {
  const { openDrawer } = React.useContext(DrawerContext);
  return (
    <Button transparent onPress={openDrawer}>
      <Icon name="menu" style={styles.icon} />
    </Button>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: "white"
  }
});

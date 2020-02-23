import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";

import { ChannelFragment } from "../graphql/fragments/Channel";
import useNavigation from "../hooks/useNavigation";
import { DrawerContext } from "../contexts";

interface IProps {
  node: ChannelFragment;
}

const ChannelItem = ({ node: { id, title } }: IProps) => {
  const { navigation, route } = useNavigation("Comments");
  const { closeDrawer } = React.useContext(DrawerContext);
  const isCurrent = route?.params?.channelId === id;

  const onclick = () => {
    navigation.navigate("Comments", { channelId: id, channelTitle: title });
    closeDrawer();
  };

  const textStyle = React.useMemo(() => [styles.title, isCurrent && styles.active], [isCurrent]);

  return (
    <TouchableOpacity onPress={onclick}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 10,
    color: "white"
  },
  active: {
    backgroundColor: "#4C9689"
  }
});

export default ChannelItem;

import React from "react";
import { useDispatch } from "react-redux";
import { Button, Text } from "native-base";

import { updateCurrentChannel } from "../redux/actions";
import { DrawerContext } from "./AppDrawer";
import { ChannelFragment } from "../graphql/fragments/Channel";

interface IProps {
  node: ChannelFragment;
}

const ChannelItem = ({ node: { id, title } }: IProps) => {
  const dispatch = useDispatch();
  const { closeDrawer } = React.useContext(DrawerContext);

  const onclick = () => {
    dispatch(updateCurrentChannel(id));
    closeDrawer();
  };

  return (
    <Button transparent onPress={onclick}>
      <Text>{title}</Text>
    </Button>
  );
};

export default ChannelItem;

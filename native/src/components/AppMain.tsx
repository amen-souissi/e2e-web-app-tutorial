import React from "react";
import { Text } from "native-base";

import Comments from "./Comments";
import useSelector from "../hooks/useSelector";

export default function AppMain() {
  const channelId: string = useSelector(state => state.currentChannel);

  return channelId ? <Comments channelId={channelId} /> : <Text>Hello !</Text>;
}

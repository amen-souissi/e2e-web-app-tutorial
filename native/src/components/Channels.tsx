import React from "react";
import { StyleSheet, View } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import ChannelsQuery, { Query as QueryData } from "../graphql/queries/Channels";
import { ChannelFragment } from "../graphql/fragments/Channel";
import ChannelItem from "./ChannelItem";
import EntitiesList from "./EntitiesList";

const Channels = () => {
  const { data, networkStatus } = useQuery<QueryData>(ChannelsQuery, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });

  return (
    <View style={styles.menu}>
      <EntitiesList<QueryData, ChannelFragment>
        networkStatus={networkStatus}
        data={data}
        getEntities={entities => (entities ? entities.channels : [])}
        ListItem={ChannelItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#4D394B"
  }
});

export default Channels;

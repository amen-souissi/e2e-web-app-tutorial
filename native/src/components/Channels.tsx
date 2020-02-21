import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { StyleSheet, ScrollView } from "react-native";

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
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <EntitiesList<QueryData, ChannelFragment>
        networkStatus={networkStatus}
        data={data}
        getEntities={entities => (entities ? entities.channels : [])}
        ListItem={ChannelItem}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default Channels;

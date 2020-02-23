import React from "react";
import { FlatList, ActivityIndicator, StyleSheet, View, Animated } from "react-native";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IProps<Data = any, Node = any> {
  networkStatus: number;
  ListItem: React.ComponentType<{ node: Node }>;
  getEntities: (data: Data) => Node[];
  inverted?: boolean;
  data?: Data;
  onMount?: () => void;
}

function EntitiesList<Data = any, Node = any>({
  onMount,
  data,
  networkStatus,
  getEntities,
  ListItem,
  ...rest
}: IProps<Data, Node>) {
  React.useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, []);

  const entities = getEntities(data);
  if (!data || networkStatus === 1 || networkStatus === 2) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" animating />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {entities && entities.length > 0 ? (
        <AnimatedFlatList
          data={entities}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ListItem node={item} />}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              {networkStatus === 3 ? <ActivityIndicator size={30} animating /> : null}
            </View>
          )}
          {...rest}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10
  },
  header: { marginTop: 15 },
  footer: {
    width: "100%"
  }
});

export default EntitiesList;

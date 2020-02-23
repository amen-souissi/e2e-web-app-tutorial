import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "native-base";
import I18n from "react-native-i18n";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{I18n.t("hello")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold"
  }
});

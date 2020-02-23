import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "native-base";

import { CommentFragment } from "../graphql/fragments/Comment";

interface IProps {
  node: CommentFragment;
}

const CommentItem = ({ node: { text } }: IProps) => {
  return <Text style={styles.container}>{text}</Text>;
};

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    padding: 5
  }
});

export default CommentItem;

import React from "react";
import { Text } from "native-base";

import { CommentFragment } from "../graphql/fragments/Comment";

interface IProps {
  node: CommentFragment;
}

const CommentItem = ({ node: { text } }: IProps) => {
  return <Text>{text}</Text>;
};

export default CommentItem;

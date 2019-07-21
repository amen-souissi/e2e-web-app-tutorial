import gql from "graphql-tag";

import Comment from "../fragments/Comment";

export default gql`
  subscription OnCommentAdded($channelId: ID!) {
    onCommentAdded(channelId: $channelId) {
      ...comment
    }
  }
  ${Comment}
`;

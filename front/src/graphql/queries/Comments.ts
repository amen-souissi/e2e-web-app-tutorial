import gql from "graphql-tag";
import { SubscribeToMoreOptions } from "apollo-client/core/watchQueryOptions";

import Comment, { CommentFragment } from "../fragments/Comment";
import OnCommentAdded from "../subscriptions/OnCommentAdded";

export interface Query {
  comments: CommentFragment[];
}

export interface QueryVariables {
  channelId: string;
}

interface SubSciptionData {
  onCommentAdded: CommentFragment;
}

type SubscribeToMore = (
  options: SubscribeToMoreOptions<Query, QueryVariables, SubSciptionData>
) => () => void;

export const getSubscribeToNewComments = (
  subscribeToMore: SubscribeToMore,
  channelId: string
) => () =>
  subscribeToMore({
    document: OnCommentAdded,
    variables: { channelId: channelId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newComment = subscriptionData.data.onCommentAdded;
      const newCommentExists = prev.comments.find(
        comment => comment.id === newComment.id
      );
      if (newCommentExists) return prev;
      return Object.assign({}, prev, {
        comments: [newComment, ...prev.comments]
      });
    }
  });

export default gql`
  query Comments($channelId: ID!) {
    comments(channelId: $channelId) {
      ...comment
    }
  }
  ${Comment}
`;

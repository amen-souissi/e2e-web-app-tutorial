import gql from 'graphql-tag';

import Comment, { CommentFragment } from '../fragments/Comment';

export interface Mutation {
  addComment: CommentFragment;
}

export interface MutationVariables {
  channelId: string;
  comment: string;
}

export default gql`
  mutation AddComment($channelId: ID!, $comment: String!) {
    addComment(channelId: $channelId, comment: $comment) {
      ...comment
    }
  }
  ${Comment}
`;

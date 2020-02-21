import React from "react";
import { useQuery } from "@apollo/react-hooks";

import CommentsQuery, {
  Query as QueryData,
  QueryVariables,
  getSubscribeToNewComments
} from "../graphql/queries/Comments";
import { CommentFragment } from "../graphql/fragments/Comment";
import CommentItem from "./CommentItem";
import EntitiesList from "./EntitiesList";

interface IProps {
  channelId: string;
}

const Comments = ({ channelId }: IProps) => {
  const { subscribeToMore, data, networkStatus } = useQuery<QueryData, QueryVariables>(CommentsQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    variables: { channelId: channelId }
  });

  return (
    <EntitiesList<QueryData, CommentFragment>
      onMount={getSubscribeToNewComments(subscribeToMore, channelId)}
      inverted
      networkStatus={networkStatus}
      data={data}
      getEntities={entities => (entities ? entities.comments : [])}
      ListItem={CommentItem}
    />
  );
};

export default Comments;

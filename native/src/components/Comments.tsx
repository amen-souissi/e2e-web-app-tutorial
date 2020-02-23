import React from "react";
import { RouteProp } from "@react-navigation/native";
import { useQuery } from "@apollo/react-hooks";

import CommentsQuery, {
  Query as QueryData,
  QueryVariables,
  getSubscribeToNewComments
} from "../graphql/queries/Comments";
import { CommentFragment } from "../graphql/fragments/Comment";
import CommentItem from "./CommentItem";
import EntitiesList from "./EntitiesList";
import { RootStackParamList } from "./Routes";
import CommentForm from "./forms/CommentForm";

export type CommentsScreenRouteProp = RouteProp<RootStackParamList, "Comments">;

interface IProps {
  route: CommentsScreenRouteProp;
}

const Comments = ({ route }: IProps) => {
  const { channelId } = route.params;
  const { subscribeToMore, data, networkStatus } = useQuery<QueryData, QueryVariables>(CommentsQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    variables: { channelId: channelId }
  });

  return (
    <React.Fragment>
      <EntitiesList<QueryData, CommentFragment>
        onMount={getSubscribeToNewComments(subscribeToMore, channelId)}
        inverted
        networkStatus={networkStatus}
        data={data}
        getEntities={entities => (entities ? entities.comments : [])}
        ListItem={CommentItem}
      />
      <CommentForm channelId={channelId} />
    </React.Fragment>
  );
};

export default Comments;

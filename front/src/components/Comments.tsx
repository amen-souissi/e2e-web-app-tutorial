import * as React from 'react';
import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import CommentsQuery, {
  getSubscribeToNewComments,
  Query as QueryData,
  QueryVariables,
} from '../graphql/queries/Comments';
import FlatList from './common/FlatList';
import CommentItem, { Props as CommentItemFragment } from './CommentItem';
import CommentForm from './CommentForm';

const useStyles = makeStyles(
  createStyles({
    container: {
      height: 'calc(100vh - 66px)',
      position: 'relative',
    },
    comments: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
    },
    list: {
      height: 'calc(100% - 55px)',
      overflow: 'auto',
    },
    commentFormContainer: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  })
);

interface Props {
  channelId: string;
}

const Comments = ({ channelId }: Props) => {
  const classes = useStyles();
  const { data, subscribeToMore } = useQuery<QueryData, QueryVariables>(
    CommentsQuery,
    {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: { channelId },
    }
  );

  return (
    <Grid className={classes.container} container>
      <Grid
        data-testid="comments-list"
        className={classes.comments}
        item
        xs={12}
      >
        <FlatList<CommentItemFragment>
          reverted
          className={classes.list}
          items={data && data.comments}
          ListItem={CommentItem}
          onMount={getSubscribeToNewComments(subscribeToMore, channelId)}
        />
        <div className={classes.commentFormContainer}>
          <CommentForm channelId={channelId} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Comments;

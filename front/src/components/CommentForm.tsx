import * as React from 'react';
import { I18n } from 'react-redux-i18n';
import { useMutation } from '@apollo/client';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import AddComment, { MutationVariables } from '../graphql/mutations/AddComment';

interface Props {
  channelId: string;
}

const CommentForm = ({ channelId }: Props) => {
  const [addComment, { loading }] = useMutation<{}, MutationVariables>(
    AddComment
  );
  const [comment, updateComment] = React.useState<string>('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateComment(event.target.value);
  };

  const sendComment = () => {
    if (comment) {
      addComment({ variables: { comment: comment, channelId: channelId } });
      updateComment('');
    }
  };

  return (
    <TextField
      fullWidth
      disabled={loading}
      placeholder={I18n.t('channels.comment')}
      margin="normal"
      variant="outlined"
      onChange={handleCommentChange}
      value={comment}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        autoFocus: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              data-testid="send-message"
              disabled={!comment}
              edge="end"
              onClick={sendComment}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CommentForm;

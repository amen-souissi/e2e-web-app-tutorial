import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { CommentFragment } from "../graphql/fragments/Comment";

const useStyles = makeStyles(
  createStyles({
    container: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 15,
      display: "flex",
      "&:hover": {
        backgroundColor: "rgba(14, 4, 4, 0.05)"
      }
    }
  })
);

export interface Props extends CommentFragment {}

const CommentItem = ({ text }: Props) => {
  const classes = useStyles();
  return (
    <div
      className={classes.container}
      dangerouslySetInnerHTML={{
        __html: text
      }}
    />
  );
};

export default React.memo(CommentItem);

import gql from "graphql-tag";

export interface CommentFragment {
  id: string;
  text: string;
}

export default gql`
  fragment comment on Comment {
    id
    text
  }
`;

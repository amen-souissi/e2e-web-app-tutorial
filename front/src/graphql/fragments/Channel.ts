import gql from "graphql-tag";

export interface ChannelFragment {
  id: string;
  title: string;
}

export default gql`
  fragment channel on Channel {
    id
    title
  }
`;

import gql from "graphql-tag";

import Channel, { ChannelFragment } from "../fragments/Channel";

export interface Query {
  channels: ChannelFragment[];
}

export default gql`
  query Channels {
    channels {
      ...channel
    }
  }
  ${Channel}
`;

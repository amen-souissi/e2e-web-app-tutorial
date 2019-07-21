import Comment from "../graphql/shemas/comment";
import Channel from "../graphql/shemas/channel";

interface IDatabaseClient {
  getChannel: (channelId: string) => Promise<Channel>;

  getChannels: () => Promise<Channel[]>;

  getComments: (channelId: string) => Promise<Comment[]>;

  addComment: (channelId: string, comment: string) => Promise<Comment>;
}

export { default as pgDatabaseClient } from "./postgres/database-client";
export default IDatabaseClient;

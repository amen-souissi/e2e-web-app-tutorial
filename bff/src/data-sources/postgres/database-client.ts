import database from "./database";
import IDatabaseClient from "../../data-sources";
import Comment from "../../graphql/shemas/comment";
import Channel from "../../graphql/shemas/channel";

class PgDatabaseClient implements IDatabaseClient {
  getChannel(channelId: string): Promise<Channel> {
    const query = `SELECT * FROM channels WHERE id=$1`;
    const values = [channelId];
    return database.one(query, values).then(res => res);
  }

  getChannels(): Promise<Channel[]> {
    const query = `SELECT * FROM channels`;
    return database.many(query).then(res => res);
  }

  getComments(channelId: string): Promise<Comment[]> {
    const query = `SELECT * FROM comments WHERE channel_id=$1`;
    const values = [channelId];
    return database.query(query, values).then(res => res.reverse());
  }

  addComment(channelId: string, comment: string): Promise<Comment> {
    const query = `INSERT INTO comments (channel_id, text) VALUES ($1, $2) RETURNING *`;
    const values = [channelId, comment];
    return database.one(query, values).then(res => res);
  }
  checkPassword(userName: string, password: string): boolean {
    return true;
  }

  getUser(userId: string): any {
    return { id: userId, name: "Amen" };
  }

  getUserByUsername(userName: string): any {
    return { id: "1", name: "Amen" };
  }
}

export default new PgDatabaseClient();

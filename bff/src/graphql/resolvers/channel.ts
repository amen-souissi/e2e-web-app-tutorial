import {
  Resolver,
  Query,
  Ctx,
  Arg,
  ID,
  Mutation,
  PubSub,
  PubSubEngine,
  Subscription,
  Root
} from "type-graphql";
import { Context } from "apollo-server-core/dist/types";

import { AppContext } from "../../app";
import { Comment, Channel } from "../shemas";

@Resolver(of => Channel)
class ChannelResolver {
  @Query(returns => [Channel])
  channels(@Ctx() context: Context<AppContext>) {
    return context.databaseClient.getChannels();
  }

  @Query(returns => [Comment])
  comments(
    @Arg("channelId", type => ID) channelId: string,
    @Ctx() context: Context<AppContext>
  ) {
    return context.databaseClient.getComments(channelId);
  }

  @Mutation(returns => Comment)
  // @Authorized(Roles.moderator)
  async addComment(
    @PubSub() pubSub: PubSubEngine,
    @Arg("channelId", type => ID) channelId: string,
    @Arg("comment") comment: string,
    @Ctx() context: Context<AppContext>
  ) {
    const commentObj = context.databaseClient.addComment(channelId, comment);
    await pubSub.publish(channelId, commentObj);
    return commentObj;
  }

  @Subscription(returns => Comment, {
    topics: ({ args }) => args.channelId,
    nullable: true
  })
  onCommentAdded(
    @Arg("channelId", type => ID) channelId: string,
    @Root() comment: Comment
  ): Comment {
    return comment;
  }
}

export default ChannelResolver;

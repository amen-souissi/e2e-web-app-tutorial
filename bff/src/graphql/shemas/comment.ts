import { Field, ObjectType, ID, Ctx } from "type-graphql";
import { Context } from "apollo-server-core/dist/types";

import Channel from "./channel";
import { AppContext } from "../../app";

@ObjectType()
class Comment {
  @Field(type => ID)
  id!: string;

  @Field(type => ID)
  channel_id!: string;

  @Field()
  text!: string;

  @Field(type => Channel)
  channel(@Ctx() context: Context<AppContext>): Promise<Channel> {
    return context.databaseClient.getChannel(this.channel_id);
  }
}

export default Comment;

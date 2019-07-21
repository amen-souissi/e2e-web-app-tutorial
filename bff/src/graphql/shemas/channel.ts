import { Field, ObjectType, ID, Ctx } from "type-graphql";
import { Context } from "apollo-server-core/dist/types";

import Comment from "./comment";
import { AppContext } from "../../app";

@ObjectType()
class Channel {
  @Field(type => ID)
  id!: string;

  @Field()
  title!: string;

  @Field(type => [Comment])
  comments(@Ctx() context: Context<AppContext>): Promise<Comment[]> {
    return context.databaseClient.getComments(this.id);
  }
}

export default Channel;

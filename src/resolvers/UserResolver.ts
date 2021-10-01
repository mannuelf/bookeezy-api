import 'reflect-metadata';
import { User } from '../entities/User';
import {
  Resolver,
  Query,
  Ctx,
  InputType,
  Field,
  ObjectType,
  Mutation,
  Arg,
} from 'type-graphql';
import { MyContext } from 'src/types';
import { StringValueNode } from 'graphql';

@InputType()
class InputUsernamePassword {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: InputUsernamePassword,
    @Ctx() { em }: MyContext,
  ): Promise<UserResponse> {
    console.log(options);

    const user = {};
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(): Promise<UserResponse> {
    const user = {};
    return { user };
  }
}

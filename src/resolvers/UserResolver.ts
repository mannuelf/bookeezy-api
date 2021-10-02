import 'reflect-metadata';
import { Resolver, Ctx, InputType, Field, ObjectType, Mutation, Arg } from 'type-graphql';
import argon2 from 'argon2';
import { MyContext } from '../types';
import { User } from '../entities/User';

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

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      console.log(error);
      if (error) {
        return {
          errors: [{ field: 'username', message: 'username exists' }],
        };
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(): Promise<UserResponse> {
    return {};
  }
}

import 'reflect-metadata';
import {
  Resolver,
  Ctx,
  InputType,
  Field,
  ObjectType,
  Mutation,
  Arg,
  Query,
} from 'type-graphql';
import argon2 from 'argon2';
import { AppContext } from '../types';
import { User } from '../entities/User';

@InputType()
class InputEmailPassword {
  @Field()
  email: string;

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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: AppContext) {
    console.log('😍: me', req.session);

    // if not logged
    if (!req.session.userId) {
      return null;
    }

    return await em.findOne(User, { id: req.session.userId });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: InputEmailPassword,
    @Ctx() { em, req }: AppContext,
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(options.password);

    const user = em.create(User, {
      email: options.email,
      password: hashedPassword,
    });

    // TODO: email validation yup or express-validator
    if (options.email.length <= 2) {
      return {
        errors: [
          {
            field: 'email',
            message: 'email must have more than two letters',
          },
        ],
      };
    }

    if (options.password.length <= 4) {
      return {
        errors: [
          {
            field: 'password',
            message: 'password must have more than for characters',
          },
        ],
      };
    }
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      console.log(error);
      if (error.detail.includes('exists')) {
        return {
          errors: [{ field: 'email', message: 'User already exists' }],
        };
      }
    }

    /**
     * store user ID session: keep logged in
     */
    console.log('🥥 register:', user.id);

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: InputEmailPassword,
    @Ctx() { em, req }: AppContext,
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: options.email });

    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'user does not exist',
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password please try again or reset it.',
          },
        ],
      };
    }

    // send the current user ID to backend for auth.
    console.log('🥝 Login:', user.id);

    req.session.userId = user.id;

    return { user };
  }
}

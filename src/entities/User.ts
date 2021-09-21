import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'text' })
  firstName!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  lastName!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  location!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  birthday!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  email!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  password!: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: Date, onUpdate: () => new Date() })
  updatedAt = new Date();
}

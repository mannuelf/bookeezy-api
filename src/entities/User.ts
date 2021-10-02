import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'text', nullable: true })
  username!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  email!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  password!: string;

  @Field(() => String)
  @Property({ type: 'text', nullable: true })
  firstName?: string;

  @Field(() => String)
  @Property({ type: 'text', nullable: true })
  lastName?: string;

  @Field(() => String)
  @Property({ type: 'text', nullable: true })
  location?: string;

  @Field(() => String)
  @Property({ type: 'text', nullable: true })
  birthday?: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: Date, onUpdate: () => new Date() })
  updatedAt = new Date();
}

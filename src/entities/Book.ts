import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { MaxLength } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Book {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field({ description: 'The title of the book' })
  @Property({ type: 'text' })
  title!: string;

  @Field()
  author!: string;

  @Field()
  @MaxLength(6)
  NumberOfPages!: string;

  @Field()
  @MaxLength(10)
  ISBN!: string;

  @Field({ nullable: true })
  @MaxLength(13)
  ISBN13?: string;

  @Field()
  publisher!: string;

  @Field()
  datePublished!: string;

  @Field()
  image!: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: Date, onUpdate: () => new Date() })
  updatedAt = new Date();
}

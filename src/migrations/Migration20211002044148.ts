import { Migration } from '@mikro-orm/migrations';

export class Migration20211002044148 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" text not null, "email" text not null, "password" text not null, "first_name" text not null, "last_name" text not null, "location" text not null, "birthday" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "hi" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "content" text not null);');

    this.addSql('create table "book" ("id" serial primary key, "title" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}

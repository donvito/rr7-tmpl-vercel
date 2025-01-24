import { pgTable, bigint, text, timestamp } from 'drizzle-orm/pg-core';

export const blogPosts = pgTable('blog_posts', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
}); 
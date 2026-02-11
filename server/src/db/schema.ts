import { pgTable, varchar, serial, timestamp } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

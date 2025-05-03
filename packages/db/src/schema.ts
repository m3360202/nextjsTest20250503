import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { bigint } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"),
  ownerId: bigint("owner_id", { mode: "bigint" }).references(() => users.id),
});

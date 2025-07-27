import { InferModel, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

import { nanoid } from "nanoid";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const courseLevelEnum = pgEnum("course_level", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const courseStatusEnum = pgEnum("course_status", [
  "draft",
  "published",
  "archived",
]);

export const courseTable = pgTable("courses", {
  id: text()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text().notNull(),
  description: text().notNull(),
  small_description: text().notNull(),
  price: integer().notNull(),
  duration: integer().notNull(),
  slug: text().notNull().unique(),
  file_key: text().notNull(),
  category: text().notNull(),
  level: courseLevelEnum().notNull().default("beginner"),
  status: courseStatusEnum().notNull().default("draft"),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  created_at: timestamp()
    .$defaultFn(() => new Date())
    .notNull(),
  updated_at: timestamp()
    .$defaultFn(() => new Date())
    .notNull(),
});

// User has many courses
export const userRelations = relations(user, ({ many }) => ({
  courses: many(courseTable),
}));

// Courses belongs to one user
export const courseRelations = relations(courseTable, ({ one }) => ({
  user: one(user, {
    fields: [courseTable.userId],
    references: [user.id],
  }),
}));

export type CourseType = InferModel<typeof courseTable>;

export type NewCourse = InferModel<typeof courseTable, "insert">;

export type UpdateCourse = Partial<NewCourse>;

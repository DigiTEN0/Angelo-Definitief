import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin users table (for authentication)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Properties table
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  address: text("address").notNull(),
  city: text("city").notNull().default("Montreal"),
  province: text("province").notNull().default("Quebec"),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  squareFeet: integer("square_feet").notNull(),
  lotSize: integer("lot_size"),
  yearBuilt: integer("year_built"),
  status: text("status").notNull().default("active"), // active, pending, sold
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`),
  images: text("images").array().notNull().default(sql`ARRAY[]::text[]`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPropertySchema = createInsertSchema(properties, {
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  squareFeet: z.number().int().min(1),
  lotSize: z.number().int().optional(),
  yearBuilt: z.number().int().min(1800).max(new Date().getFullYear() + 1).optional(),
  status: z.enum(["active", "pending", "sold"]),
  features: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
}).omit({ id: true, createdAt: true, updatedAt: true });

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

// Leads table (contact form submissions)
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  propertyId: varchar("property_id").references(() => properties.id),
  propertyInterest: text("property_interest"), // general inquiry or specific property
  status: text("status").notNull().default("new"), // new, contacted, qualified, closed
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const leadsRelations = relations(leads, ({ one }) => ({
  property: one(properties, {
    fields: [leads.propertyId],
    references: [properties.id],
  }),
}));

export const insertLeadSchema = createInsertSchema(leads, {
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
}).omit({ id: true, createdAt: true, status: true });

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Viewings/Schedulings table (property viewing appointments)
export const viewings = pgTable("viewings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").notNull().references(() => properties.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  message: text("message"),
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const viewingsRelations = relations(viewings, ({ one }) => ({
  property: one(properties, {
    fields: [viewings.propertyId],
    references: [properties.id],
  }),
}));

export const insertViewingSchema = createInsertSchema(viewings, {
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  name: z.string().min(2, "Name must be at least 2 characters"),
}).omit({ id: true, createdAt: true, status: true });

export type InsertViewing = z.infer<typeof insertViewingSchema>;
export type Viewing = typeof viewings.$inferSelect;

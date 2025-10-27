// Referenced from javascript_database blueprint - updated to DatabaseStorage
import { 
  users, 
  properties, 
  leads,
  viewings,
  type User, 
  type InsertUser,
  type Property,
  type InsertProperty,
  type Lead,
  type InsertLead,
  type Viewing,
  type InsertViewing
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Property methods
  getAllProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;

  // Lead methods
  getAllLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<boolean>;

  // Viewing methods
  getAllViewings(): Promise<Viewing[]>;
  getViewing(id: string): Promise<Viewing | undefined>;
  createViewing(viewing: InsertViewing): Promise<Viewing>;
  updateViewingStatus(id: string, status: string): Promise<Viewing | undefined>;
  deleteViewing(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Property methods
  async getAllProperties(): Promise<Property[]> {
    const result = await db
      .select()
      .from(properties)
      .orderBy(desc(properties.createdAt));
    return result;
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const [property] = await db
      .select()
      .from(properties)
      .where(eq(properties.id, id));
    return property || undefined;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db
      .insert(properties)
      .values(insertProperty)
      .returning();
    return property;
  }

  async updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const [property] = await db
      .update(properties)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return property || undefined;
  }

  async deleteProperty(id: string): Promise<boolean> {
    const result = await db
      .delete(properties)
      .where(eq(properties.id, id))
      .returning();
    return result.length > 0;
  }

  // Lead methods
  async getAllLeads(): Promise<Lead[]> {
    const result = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));
    return result;
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db
      .select()
      .from(leads)
      .where(eq(leads.id, id));
    return lead || undefined;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    return lead || undefined;
  }

  async deleteLead(id: string): Promise<boolean> {
    const result = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();
    return result.length > 0;
  }

  // Viewing methods
  async getAllViewings(): Promise<Viewing[]> {
    const result = await db
      .select()
      .from(viewings)
      .orderBy(desc(viewings.createdAt));
    return result;
  }

  async getViewing(id: string): Promise<Viewing | undefined> {
    const [viewing] = await db
      .select()
      .from(viewings)
      .where(eq(viewings.id, id));
    return viewing || undefined;
  }

  async createViewing(insertViewing: InsertViewing): Promise<Viewing> {
    const [viewing] = await db
      .insert(viewings)
      .values(insertViewing)
      .returning();
    return viewing;
  }

  async updateViewingStatus(id: string, status: string): Promise<Viewing | undefined> {
    const [viewing] = await db
      .update(viewings)
      .set({ status })
      .where(eq(viewings.id, id))
      .returning();
    return viewing || undefined;
  }

  async deleteViewing(id: string): Promise<boolean> {
    const result = await db
      .delete(viewings)
      .where(eq(viewings.id, id))
      .returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertySchema, insertLeadSchema, insertViewingSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";
import fs from "fs";

// Setup multer for image uploads
const uploadDir = path.join(process.cwd(), "uploads", "properties");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `property_${nanoid()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max per file
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded images
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Image upload endpoint
  app.post("/api/upload/property-images", upload.array("images", 10), async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const imageUrls = req.files.map(file => `/uploads/properties/${file.filename}`);
      res.json({ imageUrls });
    } catch (error) {
      console.error("Error uploading images:", error);
      res.status(500).json({ error: "Failed to upload images" });
    }
  });

  // Property Routes
  
  // GET /api/properties - Get all properties
  app.get("/api/properties", async (_req, res) => {
    try {
      const properties = await storage.getAllProperties();
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  // GET /api/properties/:id - Get single property
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // POST /api/properties - Create new property
  app.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      console.error("Error creating property:", error);
      res.status(500).json({ error: "Failed to create property" });
    }
  });

  // PATCH /api/properties/:id - Update property
  app.patch("/api/properties/:id", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.partial().parse(req.body);
      const property = await storage.updateProperty(req.params.id, validatedData);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Failed to update property" });
    }
  });

  // DELETE /api/properties/:id - Delete property
  app.delete("/api/properties/:id", async (req, res) => {
    try {
      const success = await storage.deleteProperty(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ error: "Failed to delete property" });
    }
  });

  // Lead Routes

  // GET /api/leads - Get all leads
  app.get("/api/leads", async (_req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // GET /api/leads/:id - Get single lead
  app.get("/api/leads/:id", async (req, res) => {
    try {
      const lead = await storage.getLead(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  // POST /api/leads - Create new lead (contact form submission)
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      console.error("Error creating lead:", error);
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  // PATCH /api/leads/:id - Update lead status
  app.patch("/api/leads/:id", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ error: "Status is required" });
      }
      const lead = await storage.updateLeadStatus(req.params.id, status);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  // DELETE /api/leads/:id - Delete lead
  app.delete("/api/leads/:id", async (req, res) => {
    try {
      const success = await storage.deleteLead(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // Viewing Routes

  // GET /api/viewings - Get all viewings
  app.get("/api/viewings", async (_req, res) => {
    try {
      const viewings = await storage.getAllViewings();
      res.json(viewings);
    } catch (error) {
      console.error("Error fetching viewings:", error);
      res.status(500).json({ error: "Failed to fetch viewings" });
    }
  });

  // GET /api/viewings/:id - Get single viewing
  app.get("/api/viewings/:id", async (req, res) => {
    try {
      const viewing = await storage.getViewing(req.params.id);
      if (!viewing) {
        return res.status(404).json({ error: "Viewing not found" });
      }
      res.json(viewing);
    } catch (error) {
      console.error("Error fetching viewing:", error);
      res.status(500).json({ error: "Failed to fetch viewing" });
    }
  });

  // POST /api/viewings - Create new viewing
  app.post("/api/viewings", async (req, res) => {
    try {
      const validatedData = insertViewingSchema.parse(req.body);
      const viewing = await storage.createViewing(validatedData);
      res.status(201).json(viewing);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      console.error("Error creating viewing:", error);
      res.status(500).json({ error: "Failed to create viewing" });
    }
  });

  // PATCH /api/viewings/:id - Update viewing status
  app.patch("/api/viewings/:id", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ error: "Status is required" });
      }
      const viewing = await storage.updateViewingStatus(req.params.id, status);
      if (!viewing) {
        return res.status(404).json({ error: "Viewing not found" });
      }
      res.json(viewing);
    } catch (error) {
      console.error("Error updating viewing:", error);
      res.status(500).json({ error: "Failed to update viewing" });
    }
  });

  // DELETE /api/viewings/:id - Delete viewing
  app.delete("/api/viewings/:id", async (req, res) => {
    try {
      const success = await storage.deleteViewing(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Viewing not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting viewing:", error);
      res.status(500).json({ error: "Failed to delete viewing" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

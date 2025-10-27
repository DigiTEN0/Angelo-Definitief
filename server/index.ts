import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db, pool } from "./db";
import { sql } from "drizzle-orm";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });
  next();
});

// Auto-create database tables on startup
async function initDatabase() {
  try {
    log("Checking database tables...");
    
    // Test if tables exist by running a simple query
    await db.execute(sql`SELECT 1 FROM users LIMIT 1`);
    log("Database tables already exist");
  } catch (error) {
    log("Tables don't exist, creating them now...");
    
    try {
      // Create tables using raw SQL based on schema
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS properties (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL(12, 2) NOT NULL,
          address TEXT NOT NULL,
          city TEXT NOT NULL DEFAULT 'Montreal',
          province TEXT NOT NULL DEFAULT 'Quebec',
          bedrooms INTEGER NOT NULL,
          bathrooms INTEGER NOT NULL,
          square_feet INTEGER NOT NULL,
          lot_size INTEGER,
          year_built INTEGER,
          status TEXT NOT NULL DEFAULT 'active',
          features TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
          images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS leads (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          message TEXT NOT NULL,
          property_id VARCHAR REFERENCES properties(id),
          property_interest TEXT,
          status TEXT NOT NULL DEFAULT 'new',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS viewings (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          property_id VARCHAR NOT NULL REFERENCES properties(id),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          preferred_date TEXT,
          preferred_time TEXT,
          message TEXT,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS session (
          sid VARCHAR NOT NULL COLLATE "default" PRIMARY KEY,
          sess JSON NOT NULL,
          expire TIMESTAMP(6) NOT NULL
        );

        CREATE INDEX IF NOT EXISTS IDX_session_expire ON session (expire);
      `);
      
      log("Database tables created successfully!");
    } catch (createError) {
      log("Error creating tables: " + createError);
      throw createError;
    }
  }
}

(async () => {
  // Initialize database first
  await initDatabase();

  const server = await registerRoutes(app);
  
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();

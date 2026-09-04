import { createClient } from "@libsql/client";
import { DatabaseSync } from "node:sqlite";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { compareSync, hashSync } from "bcryptjs";
import { defaultConfig, SiteConfig } from "@/lib/siteConfig";

export interface AdminUser {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

// Use Turso if credentials are provided, otherwise fall back to local SQLite
const useTurso = tursoUrl && tursoAuthToken;

let db: ReturnType<typeof createClient> | DatabaseSync | null = null;

async function getDb() {
  if (db) return db;

  try {
    if (useTurso) {
      // For production, use Turso
      db = createClient({ url: tursoUrl!, authToken: tursoAuthToken! });
      
      // Initialize tables - separate calls for Turso
      await db.execute(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT (datetime('now')),
          updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS site_config (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          value TEXT NOT NULL,
          updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `);
    } else {
      // For development or when Turso is not configured, use local SQLite
      const DATA_DIR = join(process.cwd(), "data");
      if (!existsSync(DATA_DIR)) {
        mkdirSync(DATA_DIR, { recursive: true });
      }
      const DB_PATH = join(DATA_DIR, "admin.db");
      db = new DatabaseSync(DB_PATH);
      
      // Initialize tables
      db.exec(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT (datetime('now')),
          updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS site_config (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          value TEXT NOT NULL,
          updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
    }

    await seedDefaultAdmin();
    await seedDefaultConfig();

    return db;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

export async function seedDefaultAdmin() {
  const db = await getDb();
  let existing;
  
  if (useTurso) {
    const result = await (db as ReturnType<typeof createClient>).execute("SELECT id FROM admin_users LIMIT 1");
    existing = result.rows.length > 0;
  } else {
    const stmt = (db as DatabaseSync).prepare("SELECT id FROM admin_users LIMIT 1");
    existing = stmt.get() as { id: number } | undefined;
  }
  
  if (existing) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    console.warn("[adminDb] ADMIN_EMAIL and ADMIN_PASSWORD env vars are required to seed the default admin user.");
    return;
  }

  const passwordHash = hashSync(password, 12);
  
  if (useTurso) {
    await (db as ReturnType<typeof createClient>).execute("INSERT INTO admin_users (email, password_hash) VALUES (?, ?)", [email, passwordHash]);
  } else {
    const stmt = (db as DatabaseSync).prepare("INSERT INTO admin_users (email, password_hash) VALUES (?, ?)");
    stmt.run(email, passwordHash);
  }
}

export async function getAdminByEmail(email: string): Promise<AdminUser | undefined> {
  const db = await getDb();
  
  if (useTurso) {
    const result = await (db as ReturnType<typeof createClient>).execute("SELECT id, email, password_hash as passwordHash, created_at as createdAt, updated_at as updatedAt FROM admin_users WHERE email = ?", [email]);
    return result.rows[0] as unknown as AdminUser | undefined;
  } else {
    const stmt = (db as DatabaseSync).prepare("SELECT id, email, password_hash as passwordHash, created_at as createdAt, updated_at as updatedAt FROM admin_users WHERE email = ?");
    return stmt.get(email) as AdminUser | undefined;
  }
}

export async function verifyAdminPassword(email: string, password: string): Promise<AdminUser | null> {
  const user = await getAdminByEmail(email);
  if (!user) return null;
  if (!compareSync(password, user.passwordHash)) return null;
  return user;
}

export async function updateAdminPassword(userId: number, newPassword: string): Promise<void> {
  const db = await getDb();
  const passwordHash = hashSync(newPassword, 12);
  
  if (useTurso) {
    await (db as ReturnType<typeof createClient>).execute("UPDATE admin_users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?", [passwordHash, userId]);
  } else {
    const stmt = (db as DatabaseSync).prepare("UPDATE admin_users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?");
    stmt.run(passwordHash, userId);
  }
}

export async function seedDefaultConfig() {
  const db = await getDb();
  let existing;
  
  if (useTurso) {
    const result = await (db as ReturnType<typeof createClient>).execute("SELECT id FROM site_config LIMIT 1");
    existing = result.rows.length > 0;
  } else {
    const stmt = (db as DatabaseSync).prepare("SELECT id FROM site_config LIMIT 1");
    existing = stmt.get() as { id: number } | undefined;
  }
  
  if (existing) return;

  const configJson = JSON.stringify(defaultConfig);
  
  if (useTurso) {
    await (db as ReturnType<typeof createClient>).execute("INSERT INTO site_config (key, value) VALUES (?, ?)", ["site_config", configJson]);
  } else {
    const stmt = (db as DatabaseSync).prepare("INSERT INTO site_config (key, value) VALUES (?, ?)");
    stmt.run("site_config", configJson);
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const db = await getDb();
  
  if (useTurso) {
    const result = await (db as ReturnType<typeof createClient>).execute("SELECT value FROM site_config WHERE key = ?", ["site_config"]);
    if (result.rows.length === 0) return defaultConfig;
    try {
      const saved = JSON.parse(result.rows[0].value as string) as Partial<SiteConfig>;
      return {
        ...defaultConfig,
        ...saved,
        sections: { ...defaultConfig.sections, ...(saved.sections || {}) },
      } as SiteConfig;
    } catch {
      return defaultConfig;
    }
  } else {
    const stmt = (db as DatabaseSync).prepare("SELECT value FROM site_config WHERE key = ?");
    const row = stmt.get("site_config") as { value: string } | undefined;
    if (!row) return defaultConfig;
    try {
      const saved = JSON.parse(row.value) as Partial<SiteConfig>;
      return {
        ...defaultConfig,
        ...saved,
        sections: { ...defaultConfig.sections, ...(saved.sections || {}) },
      } as SiteConfig;
    } catch {
      return defaultConfig;
    }
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  const db = await getDb();
  const configJson = JSON.stringify(config);
  
  if (useTurso) {
    const result = await (db as ReturnType<typeof createClient>).execute("UPDATE site_config SET value = ?, updated_at = datetime('now') WHERE key = ?", [configJson, "site_config"]);
    if (result.rowsAffected === 0) {
      await (db as ReturnType<typeof createClient>).execute("INSERT INTO site_config (key, value) VALUES (?, ?)", ["site_config", configJson]);
    }
  } else {
    const stmt = (db as DatabaseSync).prepare("UPDATE site_config SET value = ?, updated_at = datetime('now') WHERE key = ?");
    const result = stmt.run(configJson, "site_config");
    if (result.changes === 0) {
      const insert = (db as DatabaseSync).prepare("INSERT INTO site_config (key, value) VALUES (?, ?)");
      insert.run("site_config", configJson);
    }
  }
}

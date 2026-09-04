import { createClient } from "@libsql/client";
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

// Use local SQLite for development, Turso for production
const isLocal = !tursoUrl || process.env.NODE_ENV === "development";

let db: ReturnType<typeof createClient> | null = null;

async function getDb() {
  if (db) return db;

  if (isLocal) {
    // For local development, use in-memory SQLite
    db = createClient({ url: "file:local.db" });
  } else {
    // For production, use Turso
    if (!tursoUrl || !tursoAuthToken) {
      throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables are required in production");
    }
    db = createClient({ url: tursoUrl, authToken: tursoAuthToken });
  }

  // Initialize tables
  await db.execute(`
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

  await seedDefaultAdmin();
  await seedDefaultConfig();

  return db;
}

export async function seedDefaultAdmin() {
  const db = await getDb();
  const result = await db.execute("SELECT id FROM admin_users LIMIT 1");
  if (result.rows.length > 0) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    console.warn("[adminDb] ADMIN_EMAIL and ADMIN_PASSWORD env vars are required to seed the default admin user.");
    return;
  }

  const passwordHash = hashSync(password, 12);
  await db.execute("INSERT INTO admin_users (email, password_hash) VALUES (?, ?)", [email, passwordHash]);
}

export async function getAdminByEmail(email: string): Promise<AdminUser | undefined> {
  const db = await getDb();
  const result = await db.execute("SELECT id, email, password_hash as passwordHash, created_at as createdAt, updated_at as updatedAt FROM admin_users WHERE email = ?", [email]);
  return result.rows[0] as unknown as AdminUser | undefined;
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
  await db.execute("UPDATE admin_users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?", [passwordHash, userId]);
}

export async function seedDefaultConfig() {
  const db = await getDb();
  const result = await db.execute("SELECT id FROM site_config LIMIT 1");
  if (result.rows.length > 0) return;

  const configJson = JSON.stringify(defaultConfig);
  await db.execute("INSERT INTO site_config (key, value) VALUES (?, ?)", ["site_config", configJson]);
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const db = await getDb();
  const result = await db.execute("SELECT value FROM site_config WHERE key = ?", ["site_config"]);
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
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  const db = await getDb();
  const configJson = JSON.stringify(config);
  const result = await db.execute("UPDATE site_config SET value = ?, updated_at = datetime('now') WHERE key = ?", [configJson, "site_config"]);
  if (result.rowsAffected === 0) {
    await db.execute("INSERT INTO site_config (key, value) VALUES (?, ?)", ["site_config", configJson]);
  }
}

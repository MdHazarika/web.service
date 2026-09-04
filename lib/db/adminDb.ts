import { DatabaseSync, type StatementSync } from "node:sqlite";
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

const DATA_DIR = join(process.cwd(), "data");
const DB_PATH = join(DATA_DIR, "admin.db");

function ensureDb() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  const db = new DatabaseSync(DB_PATH);
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
  dbInstance = db;
  seedDefaultAdmin();
  seedDefaultConfig();
  return db;
}

let dbInstance: DatabaseSync | null = null;

export function getAdminDb(): DatabaseSync {
  if (!dbInstance) dbInstance = ensureDb();
  return dbInstance;
}

export function seedDefaultAdmin() {
  const db = getAdminDb();
  const existing = db.prepare("SELECT id FROM admin_users LIMIT 1").get() as { id: number } | undefined;
  if (existing) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    console.warn("[adminDb] ADMIN_EMAIL and ADMIN_PASSWORD env vars are required to seed the default admin user.");
    return;
  }

  const passwordHash = hashSync(password, 12);
  const insert = db.prepare("INSERT INTO admin_users (email, password_hash) VALUES (?, ?)");
  insert.run(email, passwordHash);
}

export function getAdminByEmail(email: string): AdminUser | undefined {
  const db = getAdminDb();
  const stmt = db.prepare("SELECT id, email, password_hash as passwordHash, created_at as createdAt, updated_at as updatedAt FROM admin_users WHERE email = ?");
  return stmt.get(email) as AdminUser | undefined;
}

export function verifyAdminPassword(email: string, password: string): AdminUser | null {
  const user = getAdminByEmail(email);
  if (!user) return null;
  if (!compareSync(password, user.passwordHash)) return null;
  return user;
}

export function updateAdminPassword(userId: number, newPassword: string): void {
  const db = getAdminDb();
  const passwordHash = hashSync(newPassword, 12);
  const stmt = db.prepare("UPDATE admin_users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?");
  stmt.run(passwordHash, userId);
}

export function seedDefaultConfig() {
  const db = getAdminDb();
  const existing = db.prepare("SELECT id FROM site_config LIMIT 1").get() as { id: number } | undefined;
  if (existing) return;

  const configJson = JSON.stringify(defaultConfig);
  const insert = db.prepare("INSERT INTO site_config (key, value) VALUES (?, ?)");
  insert.run("site_config", configJson);
}

export function getSiteConfig(): SiteConfig {
  const db = getAdminDb();
  const row = db.prepare("SELECT value FROM site_config WHERE key = ?").get("site_config") as { value: string } | undefined;
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

export function saveSiteConfig(config: SiteConfig): void {
  const db = getAdminDb();
  const configJson = JSON.stringify(config);
  const update = db.prepare("UPDATE site_config SET value = ?, updated_at = datetime('now') WHERE key = ?");
  const result = update.run(configJson, "site_config");
  if (result.changes === 0) {
    const insert = db.prepare("INSERT INTO site_config (key, value) VALUES (?, ?)");
    insert.run("site_config", configJson);
  }
}

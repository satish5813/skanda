import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

export type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  project: string;
  budget: string;
  requirement: string | null;
  visitDate: string | null;
  message: string | null;
  source: string;
  ipAddress: string | null;
  createdAt: string;
};

export type NewLead = Omit<Lead, "id" | "createdAt">;

const globalForDb = globalThis as unknown as {
  skandaDb?: Database.Database;
};

function getDbPath() {
  const configuredPath = process.env.SQLITE_PATH?.trim();
  const resolvedPath = configuredPath || path.join("data", "skanda-estates.sqlite");

  return path.isAbsolute(resolvedPath)
    ? resolvedPath
    : path.join(process.cwd(), resolvedPath);
}

export function getDb() {
  if (globalForDb.skandaDb) {
    return globalForDb.skandaDb;
  }

  const dbPath = getDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      project TEXT NOT NULL,
      budget TEXT NOT NULL,
      requirement TEXT,
      visit_date TEXT,
      message TEXT,
      source TEXT NOT NULL,
      ip_address TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_leads_project ON leads(project);
  `);

  globalForDb.skandaDb = db;
  return db;
}

function mapLead(row: Record<string, unknown>): Lead {
  return {
    id: Number(row.id),
    name: String(row.name),
    phone: String(row.phone),
    email: row.email ? String(row.email) : null,
    project: String(row.project),
    budget: String(row.budget),
    requirement: row.requirement ? String(row.requirement) : null,
    visitDate: row.visit_date ? String(row.visit_date) : null,
    message: row.message ? String(row.message) : null,
    source: String(row.source),
    ipAddress: row.ip_address ? String(row.ip_address) : null,
    createdAt: String(row.created_at)
  };
}

export function createLead(lead: NewLead) {
  const statement = getDb().prepare(`
    INSERT INTO leads (
      name,
      phone,
      email,
      project,
      budget,
      requirement,
      visit_date,
      message,
      source,
      ip_address
    )
    VALUES (
      @name,
      @phone,
      @email,
      @project,
      @budget,
      @requirement,
      @visitDate,
      @message,
      @source,
      @ipAddress
    )
  `);

  const result = statement.run(lead);
  const row = getDb()
    .prepare("SELECT * FROM leads WHERE id = ?")
    .get(result.lastInsertRowid) as Record<string, unknown>;

  return mapLead(row);
}

export function listLeads() {
  const rows = getDb()
    .prepare("SELECT * FROM leads ORDER BY datetime(created_at) DESC")
    .all() as Record<string, unknown>[];

  return rows.map(mapLead);
}

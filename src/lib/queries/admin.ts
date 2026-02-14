import { db } from "@/lib/db";
import type { VvE, Gebouw, Lid } from "@/types";

// --- VvE queries ---

export function getAllVves(): VvE[] {
  return db.prepare("SELECT * FROM vves ORDER BY naam").all() as VvE[];
}

export function getVveById(id: number): VvE | undefined {
  return db.prepare("SELECT * FROM vves WHERE id = ?").get(id) as VvE | undefined;
}

export function getVveWithStats(id: number): VvE & { aantal_gebouwen: number; aantal_eigenaren: number } | undefined {
  return db.prepare(`
    SELECT v.*,
      (SELECT COUNT(*) FROM gebouwen WHERE vve_id = v.id) as aantal_gebouwen,
      (SELECT COUNT(*) FROM leden l JOIN gebouwen g ON l.gebouw_id = g.id WHERE g.vve_id = v.id) as aantal_eigenaren
    FROM vves v WHERE v.id = ?
  `).get(id) as (VvE & { aantal_gebouwen: number; aantal_eigenaren: number }) | undefined;
}

export function getAllVvesWithStats(): (VvE & { aantal_gebouwen: number; aantal_eigenaren: number })[] {
  return db.prepare(`
    SELECT v.*,
      (SELECT COUNT(*) FROM gebouwen WHERE vve_id = v.id) as aantal_gebouwen,
      (SELECT COUNT(*) FROM leden l JOIN gebouwen g ON l.gebouw_id = g.id WHERE g.vve_id = v.id) as aantal_eigenaren
    FROM vves v ORDER BY v.naam
  `).all() as (VvE & { aantal_gebouwen: number; aantal_eigenaren: number })[];
}

// --- Gebouw queries ---

export function getGebouwenByVve(vveId: number): (Gebouw & { aantal_leden: number })[] {
  return db.prepare(`
    SELECT g.*,
      (SELECT COUNT(*) FROM leden WHERE gebouw_id = g.id) as aantal_leden
    FROM gebouwen g
    WHERE g.vve_id = ?
    ORDER BY g.naam
  `).all(vveId) as (Gebouw & { aantal_leden: number })[];
}

export function getGebouwById(id: number): Gebouw | undefined {
  return db.prepare(`
    SELECT g.*, v.naam as vve_naam
    FROM gebouwen g
    JOIN vves v ON g.vve_id = v.id
    WHERE g.id = ?
  `).get(id) as Gebouw | undefined;
}

// --- Leden per gebouw ---

export function getLedenByGebouw(gebouwId: number): Lid[] {
  return db.prepare(`
    SELECT l.*, g.naam as gebouw_naam
    FROM leden l
    LEFT JOIN gebouwen g ON l.gebouw_id = g.id
    WHERE l.gebouw_id = ?
    ORDER BY l.appartement
  `).all(gebouwId) as Lid[];
}

export function getLedenByVve(vveId: number): (Lid & { gebouw_naam: string })[] {
  return db.prepare(`
    SELECT l.*, g.naam as gebouw_naam
    FROM leden l
    JOIN gebouwen g ON l.gebouw_id = g.id
    WHERE g.vve_id = ?
    ORDER BY g.naam, l.appartement
  `).all(vveId) as (Lid & { gebouw_naam: string })[];
}

export function getUnassignedLeden(): Lid[] {
  return db.prepare(`
    SELECT * FROM leden WHERE gebouw_id IS NULL ORDER BY naam
  `).all() as Lid[];
}

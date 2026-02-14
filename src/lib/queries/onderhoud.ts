import { db } from "@/lib/db";
import type { Onderhoud } from "@/types";

export function getAllOnderhoud(): Onderhoud[] {
  return db
    .prepare("SELECT * FROM onderhoud ORDER BY geplande_datum DESC")
    .all() as Onderhoud[];
}

export function getOnderhoudByStatus(status: string): Onderhoud[] {
  return db
    .prepare(
      "SELECT * FROM onderhoud WHERE status = ? ORDER BY geplande_datum DESC"
    )
    .all(status) as Onderhoud[];
}

export function getUpcomingOnderhoud(limit: number = 5): Onderhoud[] {
  return db
    .prepare(
      `SELECT * FROM onderhoud
       WHERE status IN ('gepland', 'bezig')
       ORDER BY geplande_datum ASC
       LIMIT ?`
    )
    .all(limit) as Onderhoud[];
}

export function getOnderhoudById(id: number): Onderhoud | undefined {
  return db.prepare("SELECT * FROM onderhoud WHERE id = ?").get(id) as
    | Onderhoud
    | undefined;
}

export function countByStatus(): { status: string; aantal: number }[] {
  return db
    .prepare(
      "SELECT status, COUNT(*) as aantal FROM onderhoud GROUP BY status"
    )
    .all() as { status: string; aantal: number }[];
}

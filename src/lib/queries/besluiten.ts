import { db } from "@/lib/db";
import type { Besluit, Stem, StemResultaat } from "@/types";

export function getAllBesluiten(): Besluit[] {
  return db
    .prepare(
      `SELECT b.*, l.naam as indiener_naam
       FROM besluiten b
       JOIN leden l ON b.ingediend_door = l.id
       ORDER BY b.created_at DESC`
    )
    .all() as Besluit[];
}

export function getBesluitById(id: number): Besluit | undefined {
  return db
    .prepare(
      `SELECT b.*, l.naam as indiener_naam
       FROM besluiten b
       JOIN leden l ON b.ingediend_door = l.id
       WHERE b.id = ?`
    )
    .get(id) as Besluit | undefined;
}

export function getRecenteBesluiten(limit: number = 3): Besluit[] {
  return db
    .prepare(
      `SELECT b.*, l.naam as indiener_naam
       FROM besluiten b
       JOIN leden l ON b.ingediend_door = l.id
       ORDER BY b.created_at DESC
       LIMIT ?`
    )
    .all(limit) as Besluit[];
}

export function getStemmenVoorBesluit(besluitId: number): Stem[] {
  return db
    .prepare(
      `SELECT s.*, l.naam as lid_naam
       FROM stemmen s
       JOIN leden l ON s.lid_id = l.id
       WHERE s.besluit_id = ?
       ORDER BY s.created_at`
    )
    .all(besluitId) as Stem[];
}

export function getStemResultaat(besluitId: number): StemResultaat {
  const stemmen = db
    .prepare("SELECT stem, COUNT(*) as aantal FROM stemmen WHERE besluit_id = ? GROUP BY stem")
    .all(besluitId) as { stem: string; aantal: number }[];

  const result: StemResultaat = { voor: 0, tegen: 0, onthouding: 0, totaal: 0 };
  for (const s of stemmen) {
    if (s.stem === "voor") result.voor = s.aantal;
    else if (s.stem === "tegen") result.tegen = s.aantal;
    else if (s.stem === "onthouding") result.onthouding = s.aantal;
  }
  result.totaal = result.voor + result.tegen + result.onthouding;
  return result;
}

export function heeftGestemd(besluitId: number, lidId: number): Stem | undefined {
  return db
    .prepare("SELECT * FROM stemmen WHERE besluit_id = ? AND lid_id = ?")
    .get(besluitId, lidId) as Stem | undefined;
}

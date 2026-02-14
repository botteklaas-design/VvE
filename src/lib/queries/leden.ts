import { db } from "@/lib/db";
import type { Lid } from "@/types";

export function getAllLeden(): Lid[] {
  return db.prepare("SELECT * FROM leden ORDER BY appartement").all() as Lid[];
}

export function getLidById(id: number): Lid | undefined {
  return db.prepare("SELECT * FROM leden WHERE id = ?").get(id) as
    | Lid
    | undefined;
}

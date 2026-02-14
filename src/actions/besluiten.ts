"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function castVote(
  besluitId: number,
  lidId: number,
  stem: "voor" | "tegen" | "onthouding"
) {
  db.prepare(
    `INSERT INTO stemmen (besluit_id, lid_id, stem)
     VALUES (?, ?, ?)
     ON CONFLICT(besluit_id, lid_id) DO UPDATE SET stem = excluded.stem, created_at = datetime('now')`
  ).run(besluitId, lidId, stem);

  revalidatePath(`/besluitvorming/${besluitId}`);
  revalidatePath("/besluitvorming");
  revalidatePath("/");
}

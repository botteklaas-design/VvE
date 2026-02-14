"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- VvE actions ---

export async function createVve(formData: FormData) {
  const naam = formData.get("naam") as string;
  const adres = formData.get("adres") as string;
  const plaats = formData.get("plaats") as string;
  const kvk_nummer = (formData.get("kvk_nummer") as string) || null;

  if (!naam || !adres || !plaats) return;

  const result = db.prepare(
    "INSERT INTO vves (naam, adres, plaats, kvk_nummer) VALUES (?, ?, ?, ?)"
  ).run(naam, adres, plaats, kvk_nummer);

  revalidatePath("/admin");
  redirect(`/admin/vves/${result.lastInsertRowid}`);
}

export async function updateVve(id: number, formData: FormData) {
  const naam = formData.get("naam") as string;
  const adres = formData.get("adres") as string;
  const plaats = formData.get("plaats") as string;
  const kvk_nummer = (formData.get("kvk_nummer") as string) || null;

  if (!naam || !adres || !plaats) return;

  db.prepare(
    "UPDATE vves SET naam = ?, adres = ?, plaats = ?, kvk_nummer = ? WHERE id = ?"
  ).run(naam, adres, plaats, kvk_nummer, id);

  revalidatePath(`/admin/vves/${id}`);
  revalidatePath("/admin");
}

export async function deleteVve(id: number) {
  db.prepare("DELETE FROM vves WHERE id = ?").run(id);
  revalidatePath("/admin");
  redirect("/admin");
}

// --- Gebouw actions ---

export async function createGebouw(formData: FormData) {
  const vve_id = Number(formData.get("vve_id"));
  const naam = formData.get("naam") as string;
  const adres = formData.get("adres") as string;
  const aantal_eenheden = Number(formData.get("aantal_eenheden")) || 0;

  if (!vve_id || !naam || !adres) return;

  db.prepare(
    "INSERT INTO gebouwen (vve_id, naam, adres, aantal_eenheden) VALUES (?, ?, ?, ?)"
  ).run(vve_id, naam, adres, aantal_eenheden);

  revalidatePath(`/admin/vves/${vve_id}`);
}

export async function deleteGebouw(id: number, vveId: number) {
  db.prepare("UPDATE leden SET gebouw_id = NULL WHERE gebouw_id = ?").run(id);
  db.prepare("DELETE FROM gebouwen WHERE id = ?").run(id);
  revalidatePath(`/admin/vves/${vveId}`);
}

// --- Eigenaar actions ---

export async function createEigenaar(formData: FormData) {
  const naam = formData.get("naam") as string;
  const email = formData.get("email") as string;
  const appartement = formData.get("appartement") as string;
  const rol = formData.get("rol") as string;
  const gebouw_id = Number(formData.get("gebouw_id")) || null;

  if (!naam || !email || !appartement) return;

  db.prepare(
    "INSERT INTO leden (naam, email, appartement, rol, gebouw_id) VALUES (?, ?, ?, ?, ?)"
  ).run(naam, email, appartement, rol || "lid", gebouw_id);

  if (gebouw_id) {
    const gebouw = db.prepare("SELECT vve_id FROM gebouwen WHERE id = ?").get(gebouw_id) as { vve_id: number } | undefined;
    if (gebouw) revalidatePath(`/admin/vves/${gebouw.vve_id}`);
  }
  revalidatePath("/admin");
}

export async function updateEigenaarRol(lidId: number, rol: string) {
  if (!["lid", "bestuur", "beheerder"].includes(rol)) return;

  db.prepare("UPDATE leden SET rol = ? WHERE id = ?").run(rol, lidId);
  revalidatePath("/admin");
}

export async function assignEigenaarToGebouw(lidId: number, gebouwId: number | null) {
  db.prepare("UPDATE leden SET gebouw_id = ? WHERE id = ?").run(gebouwId, lidId);
  revalidatePath("/admin");
}

export async function deleteEigenaar(lidId: number) {
  db.prepare("DELETE FROM leden WHERE id = ?").run(lidId);
  revalidatePath("/admin");
}

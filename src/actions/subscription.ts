"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSubscriptionRequest(formData: FormData) {
  const lidId = Number(formData.get("lidId"));
  const bericht = formData.get("bericht") as string;

  if (!lidId) {
    throw new Error("Gebruiker niet gevonden");
  }

  // Check if user already has a pending request
  const existing = db
    .prepare("SELECT id FROM subscription_requests WHERE lid_id = ? AND status = 'pending'")
    .get(lidId);

  if (existing) {
    throw new Error("Je hebt al een openstaand abonnementverzoek");
  }

  db.prepare(
    `INSERT INTO subscription_requests (lid_id, bericht, status)
     VALUES (?, ?, 'pending')`
  ).run(lidId, bericht || null);

  revalidatePath("/admin/abonnementen");
  return { success: true, message: "Je aanvraag is ontvangen. We nemen binnenkort contact met je op." };
}

export async function updateSubscriptionRequestStatus(id: number, status: string) {
  if (!['approved', 'rejected', 'pending'].includes(status)) {
    throw new Error("Ongeldige status");
  }

  db.prepare(
    `UPDATE subscription_requests 
     SET status = ?, updated_at = datetime('now') 
     WHERE id = ?`
  ).run(status, id);

  revalidatePath("/admin/abonnementen");
  return { success: true };
}

export async function deleteSubscriptionRequest(id: number) {
  db.prepare("DELETE FROM subscription_requests WHERE id = ?").run(id);
  revalidatePath("/admin/abonnementen");
  return { success: true };
}

export async function getSubscriptionRequestCount() {
  const row = db
    .prepare("SELECT COUNT(*) as aantal FROM subscription_requests WHERE status = 'pending'")
    .get() as { aantal: number };
  return row.aantal;
}
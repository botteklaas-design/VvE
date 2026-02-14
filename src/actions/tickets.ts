"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTicket(formData: FormData) {
  const titel = formData.get("titel") as string;
  const omschrijving = formData.get("omschrijving") as string;
  const categorie = formData.get("categorie") as string;
  const prioriteit = formData.get("prioriteit") as string;
  const lidId = Number(formData.get("lidId"));

  if (!titel || !omschrijving || !lidId) {
    throw new Error("Vul alle verplichte velden in");
  }

  const result = db
    .prepare(
      `INSERT INTO tickets (titel, omschrijving, categorie, prioriteit, ingediend_door)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(titel, omschrijving, categorie || "reparatie", prioriteit || "normaal", lidId);

  revalidatePath("/tickets");
  revalidatePath("/");
  redirect(`/tickets/${result.lastInsertRowid}`);
}

export async function updateTicketStatus(ticketId: number, newStatus: string) {
  db.prepare(
    "UPDATE tickets SET status = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(newStatus, ticketId);

  revalidatePath(`/tickets/${ticketId}`);
  revalidatePath("/tickets");
  revalidatePath("/");
}

export async function addTicketComment(
  ticketId: number,
  lidId: number,
  bericht: string
) {
  if (!bericht.trim()) return;

  db.prepare(
    "INSERT INTO ticket_reacties (ticket_id, lid_id, bericht) VALUES (?, ?, ?)"
  ).run(ticketId, lidId, bericht);

  revalidatePath(`/tickets/${ticketId}`);
}

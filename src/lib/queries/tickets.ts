import { db } from "@/lib/db";
import type { Ticket, TicketReactie } from "@/types";

export function getAllTickets(): Ticket[] {
  return db
    .prepare(
      `SELECT t.*, l.naam as indiener_naam
       FROM tickets t
       JOIN leden l ON t.ingediend_door = l.id
       ORDER BY t.created_at DESC`
    )
    .all() as Ticket[];
}

export function getTicketById(id: number): Ticket | undefined {
  return db
    .prepare(
      `SELECT t.*, l.naam as indiener_naam
       FROM tickets t
       JOIN leden l ON t.ingediend_door = l.id
       WHERE t.id = ?`
    )
    .get(id) as Ticket | undefined;
}

export function getTicketReacties(ticketId: number): TicketReactie[] {
  return db
    .prepare(
      `SELECT tr.*, l.naam as lid_naam
       FROM ticket_reacties tr
       JOIN leden l ON tr.lid_id = l.id
       WHERE tr.ticket_id = ?
       ORDER BY tr.created_at ASC`
    )
    .all(ticketId) as TicketReactie[];
}

export function getOpenTicketCount(): number {
  const row = db
    .prepare(
      "SELECT COUNT(*) as aantal FROM tickets WHERE status IN ('open', 'in_behandeling')"
    )
    .get() as { aantal: number };
  return row.aantal;
}

export function getTicketsByStatus(status: string): Ticket[] {
  return db
    .prepare(
      `SELECT t.*, l.naam as indiener_naam
       FROM tickets t
       JOIN leden l ON t.ingediend_door = l.id
       WHERE t.status = ?
       ORDER BY t.created_at DESC`
    )
    .all(status) as Ticket[];
}

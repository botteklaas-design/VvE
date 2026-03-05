import { db } from "@/lib/db";
import type { SubscriptionRequest } from "@/types";

export function getAllSubscriptionRequests(): SubscriptionRequest[] {
  return db
    .prepare(
      `SELECT sr.*, l.naam as lid_naam
       FROM subscription_requests sr
       JOIN leden l ON sr.lid_id = l.id
       ORDER BY sr.created_at DESC`
    )
    .all() as SubscriptionRequest[];
}

export function getSubscriptionRequestById(id: number): SubscriptionRequest | undefined {
  return db
    .prepare(
      `SELECT sr.*, l.naam as lid_naam
       FROM subscription_requests sr
       JOIN leden l ON sr.lid_id = l.id
       WHERE sr.id = ?`
    )
    .get(id) as SubscriptionRequest | undefined;
}

export function getSubscriptionRequestsByLid(lidId: number): SubscriptionRequest[] {
  return db
    .prepare(
      `SELECT sr.*, l.naam as lid_naam
       FROM subscription_requests sr
       JOIN leden l ON sr.lid_id = l.id
       WHERE sr.lid_id = ?
       ORDER BY sr.created_at DESC`
    )
    .all(lidId) as SubscriptionRequest[];
}

export function hasActiveSubscriptionRequest(lidId: number): boolean {
  const row = db
    .prepare(
      `SELECT COUNT(*) as aantal 
       FROM subscription_requests 
       WHERE lid_id = ? AND status = 'pending'`
    )
    .get(lidId) as { aantal: number };
  return row.aantal > 0;
}

export function getSubscriptionRequestCount(): number {
  const row = db
    .prepare("SELECT COUNT(*) as aantal FROM subscription_requests WHERE status = 'pending'")
    .get() as { aantal: number };
  return row.aantal;
}
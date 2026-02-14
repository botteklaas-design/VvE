import { getTotalCosts, getMonthlyCosts } from "./kosten";
import { getUpcomingOnderhoud } from "./onderhoud";
import { getRecenteBesluiten } from "./besluiten";
import { getOpenTicketCount } from "./tickets";
import { db } from "@/lib/db";
import type { DashboardData } from "@/types";

export function getDashboardData(): DashboardData {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const geplandCount = db
    .prepare(
      "SELECT COUNT(*) as aantal FROM onderhoud WHERE status IN ('gepland', 'bezig')"
    )
    .get() as { aantal: number };

  return {
    totaleKostenDitJaar: getTotalCosts(currentYear),
    totaleKostenVorigJaar: getTotalCosts(previousYear),
    aantalOpenTickets: getOpenTicketCount(),
    aantalGeplandOnderhoud: geplandCount.aantal,
    recenteBesluiten: getRecenteBesluiten(3),
    aankomendOnderhoud: getUpcomingOnderhoud(3),
    maandelijkseKosten: getMonthlyCosts(currentYear),
  };
}

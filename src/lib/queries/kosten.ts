import { db } from "@/lib/db";

export function getMonthlyCosts(
  jaar: number
): { maand: number; totaal: number }[] {
  return db
    .prepare(
      `SELECT maand, SUM(bedrag) as totaal
       FROM kosten
       WHERE jaar = ?
       GROUP BY maand
       ORDER BY maand`
    )
    .all(jaar) as { maand: number; totaal: number }[];
}

export function getCostsByCategory(
  jaar: number
): { naam: string; totaal: number }[] {
  return db
    .prepare(
      `SELECT kc.naam, SUM(k.bedrag) as totaal
       FROM kosten k
       JOIN kostencategorieen kc ON k.categorie_id = kc.id
       WHERE k.jaar = ?
       GROUP BY kc.naam
       ORDER BY totaal DESC`
    )
    .all(jaar) as { naam: string; totaal: number }[];
}

export function getYearComparison(): {
  maand: number;
  jaar2024: number;
  jaar2025: number;
}[] {
  const result: { maand: number; jaar2024: number; jaar2025: number }[] = [];

  for (let maand = 1; maand <= 12; maand++) {
    const row2024 = db
      .prepare(
        "SELECT COALESCE(SUM(bedrag), 0) as totaal FROM kosten WHERE jaar = 2024 AND maand = ?"
      )
      .get(maand) as { totaal: number };
    const row2025 = db
      .prepare(
        "SELECT COALESCE(SUM(bedrag), 0) as totaal FROM kosten WHERE jaar = 2025 AND maand = ?"
      )
      .get(maand) as { totaal: number };
    result.push({
      maand,
      jaar2024: row2024.totaal,
      jaar2025: row2025.totaal,
    });
  }

  return result;
}

export function getTotalCosts(jaar: number): number {
  const row = db
    .prepare("SELECT COALESCE(SUM(bedrag), 0) as totaal FROM kosten WHERE jaar = ?")
    .get(jaar) as { totaal: number };
  return row.totaal;
}

export function getCostDetails(
  jaar: number
): {
  categorie_naam: string;
  maand: number;
  bedrag: number;
}[] {
  return db
    .prepare(
      `SELECT kc.naam as categorie_naam, k.maand, k.bedrag
       FROM kosten k
       JOIN kostencategorieen kc ON k.categorie_id = kc.id
       WHERE k.jaar = ?
       ORDER BY k.maand, kc.naam`
    )
    .all(jaar) as { categorie_naam: string; maand: number; bedrag: number }[];
}

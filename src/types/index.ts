export interface Lid {
  id: number;
  naam: string;
  email: string;
  appartement: string;
  rol: "lid" | "bestuur" | "beheerder";
  created_at: string;
}

export interface Kostencategorie {
  id: number;
  naam: string;
}

export interface Kost {
  id: number;
  categorie_id: number;
  categorie_naam?: string;
  bedrag: number;
  maand: number;
  jaar: number;
  omschrijving: string | null;
}

export interface Onderhoud {
  id: number;
  titel: string;
  omschrijving: string | null;
  status: "gepland" | "bezig" | "afgerond" | "uitgesteld";
  prioriteit: "laag" | "normaal" | "hoog" | "urgent";
  geplande_datum: string;
  afgerond_datum: string | null;
  geschatte_kosten: number | null;
  werkelijke_kosten: number | null;
  created_at: string;
}

export interface Besluit {
  id: number;
  titel: string;
  omschrijving: string;
  status: "open" | "stemmen" | "aangenomen" | "afgewezen";
  categorie: "financieel" | "onderhoud" | "reglement" | "algemeen";
  ingediend_door: number;
  indiener_naam?: string;
  vergadering_datum: string | null;
  notulen: string | null;
  deadline: string | null;
  created_at: string;
}

export interface Stem {
  id: number;
  besluit_id: number;
  lid_id: number;
  lid_naam?: string;
  stem: "voor" | "tegen" | "onthouding";
  created_at: string;
}

export interface StemResultaat {
  voor: number;
  tegen: number;
  onthouding: number;
  totaal: number;
}

export interface Ticket {
  id: number;
  titel: string;
  omschrijving: string;
  categorie: "reparatie" | "klacht" | "verzoek";
  status: "open" | "in_behandeling" | "afgerond" | "afgewezen";
  prioriteit: "laag" | "normaal" | "hoog" | "urgent";
  ingediend_door: number;
  indiener_naam?: string;
  toegewezen_aan: number | null;
  created_at: string;
  updated_at: string;
}

export interface TicketReactie {
  id: number;
  ticket_id: number;
  lid_id: number;
  lid_naam?: string;
  bericht: string;
  created_at: string;
}

export interface DashboardData {
  totaleKostenDitJaar: number;
  totaleKostenVorigJaar: number;
  aantalOpenTickets: number;
  aantalGeplandOnderhoud: number;
  recenteBesluiten: Besluit[];
  aankomendOnderhoud: Onderhoud[];
  maandelijkseKosten: { maand: number; totaal: number }[];
}

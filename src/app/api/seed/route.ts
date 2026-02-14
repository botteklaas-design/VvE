import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  // Drop all tables and reseed
  db.exec(`
    DELETE FROM ticket_reacties;
    DELETE FROM tickets;
    DELETE FROM stemmen;
    DELETE FROM besluiten;
    DELETE FROM onderhoud;
    DELETE FROM kosten;
    DELETE FROM kostencategorieen;
    DELETE FROM leden;
  `);

  seedDatabase(db);

  return NextResponse.json({ message: "Database opnieuw gevuld met testdata" });
}

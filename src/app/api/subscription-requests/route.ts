import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const lidId = Number(formData.get("lidId"));
    const bericht = formData.get("bericht") as string;

    if (!lidId) {
      return NextResponse.json(
        { error: "Gebruiker niet gevonden" },
        { status: 404 }
      );
    }

    // Check if user already has a pending request
    const existing = db
      .prepare("SELECT id FROM subscription_requests WHERE lid_id = ? AND status = 'pending'")
      .get(lidId);

    if (existing) {
      return NextResponse.json(
        { error: "Je hebt al een openstaand abonnementverzoek" },
        { status: 409 }
      );
    }

    const result = db
      .prepare(
        `INSERT INTO subscription_requests (lid_id, bericht, status)
         VALUES (?, ?, 'pending')`
      )
      .run(lidId, bericht || null);

    return NextResponse.json(
      { success: true, message: "Je aanvraag is ontvangen. We nemen binnenkort contact met je op." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subscription request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const lidId = Number(request.nextUrl.searchParams.get("lidId"));

    if (!lidId) {
      return NextResponse.json(
        { error: "lidId is required" },
        { status: 400 }
      );
    }

    const requests = db
      .prepare(
        "SELECT * FROM subscription_requests WHERE lid_id = ? ORDER BY created_at DESC"
      )
      .all(lidId);

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscription requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
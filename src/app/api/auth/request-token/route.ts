import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

const TOKEN_EXPIRY_MINUTES = 15;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is verplicht" }, { status: 400 });
    }

    const lid = db
      .prepare("SELECT id, naam, email FROM leden WHERE email = ?")
      .get(email) as { id: number; naam: string; email: string } | undefined;

    // Always return success to avoid email enumeration
    if (!lid) {
      return NextResponse.json({
        success: true,
        message: "Als dit e-mailadres bekend is, ontvang je een inloglink.",
      });
    }

    // Invalidate existing unused tokens for this member
    db.prepare(
      "DELETE FROM login_tokens WHERE lid_id = ? AND used_at IS NULL"
    ).run(lid.id);

    const token = randomUUID();
    const expiresAt = new Date(
      Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000
    ).toISOString();

    db.prepare(
      "INSERT INTO login_tokens (lid_id, token, expires_at) VALUES (?, ?, ?)"
    ).run(lid.id, token, expiresAt);

    // In production this token would be emailed. For development, return it directly.
    const isDev = process.env.NODE_ENV !== "production";

    return NextResponse.json({
      success: true,
      message: "Als dit e-mailadres bekend is, ontvang je een inloglink.",
      ...(isDev && { devToken: token, devLink: `/api/auth/verify?token=${token}` }),
    });
  } catch (error) {
    console.error("Error requesting login token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

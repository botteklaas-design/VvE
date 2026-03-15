import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const SESSION_COOKIE = "vve_session";
const SESSION_DAYS = 30;

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const redirectTo = request.nextUrl.searchParams.get("redirect") || "/";

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=missing_token", request.url));
  }

  const row = db
    .prepare(
      `SELECT lt.id, lt.lid_id, lt.expires_at, lt.used_at, l.naam
       FROM login_tokens lt
       JOIN leden l ON l.id = lt.lid_id
       WHERE lt.token = ?`
    )
    .get(token) as
    | { id: number; lid_id: number; expires_at: string; used_at: string | null; naam: string }
    | undefined;

  if (!row) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", request.url));
  }

  if (row.used_at) {
    return NextResponse.redirect(new URL("/login?error=token_used", request.url));
  }

  if (new Date(row.expires_at) < new Date()) {
    return NextResponse.redirect(new URL("/login?error=token_expired", request.url));
  }

  // Mark token as used
  db.prepare("UPDATE login_tokens SET used_at = datetime('now') WHERE id = ?").run(row.id);

  // Set session cookie
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  response.cookies.set(SESSION_COOKIE, String(row.lid_id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return response;
}

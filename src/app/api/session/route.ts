import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const lidId = request.cookies.get("vve_session")?.value;

  if (!lidId || isNaN(Number(lidId))) {
    return NextResponse.json({ lid: null }, { status: 401 });
  }

  const lid = db
    .prepare("SELECT id, naam, email, appartement, rol FROM leden WHERE id = ?")
    .get(Number(lidId)) as
    | { id: number; naam: string; email: string; appartement: string; rol: string }
    | undefined;

  if (!lid) {
    return NextResponse.json({ lid: null }, { status: 401 });
  }

  return NextResponse.json({ lid });
}

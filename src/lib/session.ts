import { cookies } from "next/headers";
import { db } from "./db";

const SESSION_COOKIE = "vve_session";

export type SessionLid = {
  id: number;
  naam: string;
  email: string;
  appartement: string;
  rol: string;
};

export async function getSession(): Promise<SessionLid | null> {
  const cookieStore = await cookies();
  const lidIdStr = cookieStore.get(SESSION_COOKIE)?.value;

  if (!lidIdStr || isNaN(Number(lidIdStr))) return null;

  const lid = db
    .prepare("SELECT id, naam, email, appartement, rol FROM leden WHERE id = ?")
    .get(Number(lidIdStr)) as SessionLid | undefined;

  return lid ?? null;
}

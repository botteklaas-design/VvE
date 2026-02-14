import { cookies } from "next/headers";
import { createTicket } from "@/actions/tickets";
import { TicketFormulier } from "@/components/tickets/ticket-formulier";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NieuwTicketPage() {
  const cookieStore = await cookies();
  const lidId = Number(cookieStore.get("lidId")?.value || "1");

  return (
    <div className="space-y-6 max-w-2xl">
      <Link
        href="/tickets"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug naar tickets
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nieuw ticket</h1>
        <p className="text-gray-500 text-sm mt-1">
          Dien een reparatieverzoek, klacht of melding in
        </p>
      </div>

      <TicketFormulier lidId={lidId} createTicket={createTicket} />
    </div>
  );
}

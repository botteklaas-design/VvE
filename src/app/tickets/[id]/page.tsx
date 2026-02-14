import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getTicketById, getTicketReacties } from "@/lib/queries/tickets";
import { getLidById } from "@/lib/queries/leden";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  statusKleuren,
  prioriteitKleuren,
  formatDatum,
} from "@/lib/utils";
import { ReactieFormulier } from "@/components/tickets/reactie-formulier";
import { StatusUpdate } from "@/components/tickets/status-update";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = getTicketById(Number(id));
  if (!ticket) notFound();

  const cookieStore = await cookies();
  const lidId = Number(cookieStore.get("lidId")?.value || "1");
  const huidigLid = getLidById(lidId);
  const reacties = getTicketReacties(ticket.id);

  const categorieLabels: Record<string, string> = {
    reparatie: "Reparatie",
    klacht: "Klacht",
    verzoek: "Verzoek",
  };

  const isBeheerder =
    huidigLid?.rol === "bestuur" || huidigLid?.rol === "beheerder";

  return (
    <div className="space-y-6 max-w-3xl">
      <Link
        href="/tickets"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug naar tickets
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            #{ticket.id} {ticket.titel}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-2">
            <span>
              Categorie:{" "}
              {categorieLabels[ticket.categorie] || ticket.categorie}
            </span>
            <span>Ingediend door: {ticket.indiener_naam}</span>
            <span>Datum: {formatDatum(ticket.created_at)}</span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Badge className={prioriteitKleuren[ticket.prioriteit]}>
            {ticket.prioriteit}
          </Badge>
          <Badge className={statusKleuren[ticket.status]}>
            {ticket.status.replace("_", " ")}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Omschrijving</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {ticket.omschrijving}
          </p>
        </CardContent>
      </Card>

      {/* Status update for admins */}
      {isBeheerder && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status bijwerken</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusUpdate
              ticketId={ticket.id}
              huidigeStatus={ticket.status}
            />
          </CardContent>
        </Card>
      )}

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Reacties ({reacties.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reacties.length === 0 && (
            <p className="text-sm text-gray-500">Nog geen reacties.</p>
          )}

          {reacties.map((reactie) => (
            <div
              key={reactie.id}
              className="border-b border-gray-100 pb-4 last:border-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">{reactie.lid_naam}</span>
                <span className="text-xs text-gray-400">
                  {formatDatum(reactie.created_at)}
                </span>
              </div>
              <p className="text-sm text-gray-700 ml-9 whitespace-pre-wrap">
                {reactie.bericht}
              </p>
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200">
            <ReactieFormulier ticketId={ticket.id} lidId={lidId} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

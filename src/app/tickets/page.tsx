import { getAllTickets } from "@/lib/queries/tickets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  statusKleuren,
  prioriteitKleuren,
  formatDatumKort,
} from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function TicketsPage() {
  const tickets = getAllTickets();

  const categorieLabels: Record<string, string> = {
    reparatie: "Reparatie",
    klacht: "Klacht",
    verzoek: "Verzoek",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-500 text-sm mt-1">
            Meldingen, reparatieverzoeken en klachten
          </p>
        </div>
        <Link href="/tickets/nieuw">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nieuw ticket
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="py-3 px-2 font-medium text-gray-500">#</th>
              <th className="py-3 px-2 font-medium text-gray-500">Titel</th>
              <th className="py-3 px-2 font-medium text-gray-500 hidden sm:table-cell">
                Categorie
              </th>
              <th className="py-3 px-2 font-medium text-gray-500">Status</th>
              <th className="py-3 px-2 font-medium text-gray-500 hidden md:table-cell">
                Prioriteit
              </th>
              <th className="py-3 px-2 font-medium text-gray-500 hidden lg:table-cell">
                Ingediend door
              </th>
              <th className="py-3 px-2 font-medium text-gray-500 hidden lg:table-cell">
                Datum
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-2 text-gray-400">{ticket.id}</td>
                <td className="py-3 px-2">
                  <Link
                    href={`/tickets/${ticket.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {ticket.titel}
                  </Link>
                </td>
                <td className="py-3 px-2 hidden sm:table-cell">
                  {categorieLabels[ticket.categorie] || ticket.categorie}
                </td>
                <td className="py-3 px-2">
                  <Badge className={statusKleuren[ticket.status]}>
                    {ticket.status.replace("_", " ")}
                  </Badge>
                </td>
                <td className="py-3 px-2 hidden md:table-cell">
                  <Badge className={prioriteitKleuren[ticket.prioriteit]}>
                    {ticket.prioriteit}
                  </Badge>
                </td>
                <td className="py-3 px-2 text-gray-500 hidden lg:table-cell">
                  {ticket.indiener_naam}
                </td>
                <td className="py-3 px-2 text-gray-500 hidden lg:table-cell">
                  {formatDatumKort(ticket.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

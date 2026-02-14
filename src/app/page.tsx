import { getDashboardData } from "@/lib/queries/dashboard";
import { KostenSamenvatting } from "@/components/dashboard/kosten-samenvatting";
import { OpenTickets } from "@/components/dashboard/open-tickets";
import { AankomendOnderhoud } from "@/components/dashboard/aankomend-onderhoud";
import { RecenteBesluiten } from "@/components/dashboard/recente-besluiten";
import { MiniKostenChart } from "@/components/dashboard/mini-kosten-chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const data = getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welkom bij het VvE Transparantieportaal
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KostenSamenvatting
          totaalDitJaar={data.totaleKostenDitJaar}
          totaalVorigJaar={data.totaleKostenVorigJaar}
        />
        <AankomendOnderhoud
          items={data.aankomendOnderhoud}
          geplandAantal={data.aantalGeplandOnderhoud}
        />
        <OpenTickets aantal={data.aantalOpenTickets} />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Actieve besluiten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.recenteBesluiten.filter(
                (b) => b.status === "open" || b.status === "stemmen"
              ).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Open of in stemming
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detail section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Kostenverloop</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniKostenChart data={data.maandelijkseKosten} />
          </CardContent>
        </Card>
        <RecenteBesluiten besluiten={data.recenteBesluiten} />
      </div>
    </div>
  );
}

import { getAllBesluiten } from "@/lib/queries/besluiten";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { statusKleuren, formatDatumKort } from "@/lib/utils";
import Link from "next/link";

export default function BesluitvormingPage() {
  const besluiten = getAllBesluiten();

  const statusGroepen = {
    stemmen: besluiten.filter((b) => b.status === "stemmen"),
    open: besluiten.filter((b) => b.status === "open"),
    aangenomen: besluiten.filter((b) => b.status === "aangenomen"),
    afgewezen: besluiten.filter((b) => b.status === "afgewezen"),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Besluitvorming</h1>
        <p className="text-gray-500 text-sm mt-1">
          Voorstellen, stemmingen en genomen besluiten
        </p>
      </div>

      {/* Active voting */}
      {statusGroepen.stemmen.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Actieve stemmingen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statusGroepen.stemmen.map((b) => (
              <BesluitKaart key={b.id} besluit={b} />
            ))}
          </div>
        </div>
      )}

      {/* Open proposals */}
      {statusGroepen.open.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Open voorstellen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statusGroepen.open.map((b) => (
              <BesluitKaart key={b.id} besluit={b} />
            ))}
          </div>
        </div>
      )}

      {/* Decided */}
      {(statusGroepen.aangenomen.length > 0 ||
        statusGroepen.afgewezen.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Afgeronde besluiten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...statusGroepen.aangenomen, ...statusGroepen.afgewezen].map(
              (b) => (
                <BesluitKaart key={b.id} besluit={b} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BesluitKaart({
  besluit,
}: {
  besluit: ReturnType<typeof getAllBesluiten>[0];
}) {
  const categorieLabels: Record<string, string> = {
    financieel: "Financieel",
    onderhoud: "Onderhoud",
    reglement: "Reglement",
    algemeen: "Algemeen",
  };

  return (
    <Link href={`/besluitvorming/${besluit.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{besluit.titel}</CardTitle>
            <Badge className={statusKleuren[besluit.status]}>
              {besluit.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {besluit.omschrijving}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <span>
              Categorie: {categorieLabels[besluit.categorie] || besluit.categorie}
            </span>
            <span>Ingediend door: {besluit.indiener_naam}</span>
            {besluit.deadline && (
              <span>Deadline: {formatDatumKort(besluit.deadline)}</span>
            )}
            {besluit.vergadering_datum && (
              <span>
                Vergadering: {formatDatumKort(besluit.vergadering_datum)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

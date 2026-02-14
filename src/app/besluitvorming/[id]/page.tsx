import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  getBesluitById,
  getStemResultaat,
  heeftGestemd,
} from "@/lib/queries/besluiten";
import { getAllLeden } from "@/lib/queries/leden";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { statusKleuren, formatDatumKort } from "@/lib/utils";
import { StemFormulier } from "@/components/besluiten/stem-formulier";
import { StemResultaten } from "@/components/besluiten/stem-resultaten";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BesluitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const besluit = getBesluitById(Number(id));
  if (!besluit) notFound();

  const cookieStore = await cookies();
  const lidId = Number(cookieStore.get("lidId")?.value || "1");
  const stemResultaat = getStemResultaat(besluit.id);
  const huidigeStem = heeftGestemd(besluit.id, lidId);
  const alleLeden = getAllLeden();

  const categorieLabels: Record<string, string> = {
    financieel: "Financieel",
    onderhoud: "Onderhoud",
    reglement: "Reglement",
    algemeen: "Algemeen",
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <Link
        href="/besluitvorming"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug naar overzicht
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{besluit.titel}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-2">
            <span>
              Categorie:{" "}
              {categorieLabels[besluit.categorie] || besluit.categorie}
            </span>
            <span>Ingediend door: {besluit.indiener_naam}</span>
            {besluit.deadline && (
              <span>Deadline: {formatDatumKort(besluit.deadline)}</span>
            )}
          </div>
        </div>
        <Badge className={`shrink-0 ${statusKleuren[besluit.status]}`}>
          {besluit.status}
        </Badge>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Omschrijving</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {besluit.omschrijving}
          </p>
        </CardContent>
      </Card>

      {/* Voting */}
      {(besluit.status === "stemmen" || stemResultaat.totaal > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stemresultaten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <StemResultaten
              resultaat={stemResultaat}
              totaalLeden={alleLeden.length}
            />
            {besluit.status === "stemmen" && (
              <StemFormulier
                besluitId={besluit.id}
                lidId={lidId}
                huidigeStem={huidigeStem?.stem}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Meeting minutes */}
      {besluit.notulen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notulen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {besluit.notulen}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

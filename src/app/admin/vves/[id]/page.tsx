import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Users, Home, Trash2 } from "lucide-react";
import { getVveWithStats, getGebouwenByVve, getLedenByVve } from "@/lib/queries/admin";
import { NieuwGebouwForm } from "@/components/admin/nieuw-gebouw-form";
import { NieuweEigenaarForm } from "@/components/admin/nieuwe-eigenaar-form";
import { RolSelector } from "@/components/admin/rol-selector";
import { VerwijderKnop } from "@/components/admin/verwijder-knop";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VveDetailPage({ params }: Props) {
  const { id } = await params;
  const vveId = Number(id);
  const vve = getVveWithStats(vveId);

  if (!vve) notFound();

  const gebouwen = getGebouwenByVve(vveId);
  const leden = getLedenByVve(vveId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar overzicht
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{vve.naam}</h1>
            <p className="text-gray-500">
              {vve.adres}, {vve.plaats}
            </p>
            {vve.kvk_nummer && (
              <p className="text-sm text-gray-400">KvK: {vve.kvk_nummer}</p>
            )}
          </div>
          <div className="flex gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5">
              <Home className="h-4 w-4" />
              {vve.aantal_gebouwen} gebouwen
            </span>
            <span className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5">
              <Users className="h-4 w-4" />
              {vve.aantal_eigenaren} eigenaren
            </span>
          </div>
        </div>
      </div>

      {/* Gebouwen sectie */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Gebouwen</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gebouwen.map((gebouw) => (
            <div
              key={gebouw.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-green-50 p-2">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {gebouw.naam}
                    </h3>
                    <p className="text-sm text-gray-500">{gebouw.adres}</p>
                  </div>
                </div>
                <VerwijderKnop type="gebouw" id={gebouw.id} parentId={vveId} />
              </div>
              <div className="mt-3 flex gap-4 text-sm text-gray-600">
                <span>{gebouw.aantal_eenheden} eenheden</span>
                <span>{gebouw.aantal_leden} eigenaren</span>
              </div>
            </div>
          ))}
          <NieuwGebouwForm vveId={vveId} />
        </div>
      </div>

      {/* Eigenaren sectie */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Eigenaren ({leden.length})
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Naam
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Appartement
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Gebouw
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Rol
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leden.map((lid) => (
                <tr key={lid.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {lid.naam}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {lid.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {lid.appartement}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {lid.gebouw_naam}
                  </td>
                  <td className="px-4 py-3">
                    <RolSelector lidId={lid.id} currentRol={lid.rol} />
                  </td>
                  <td className="px-4 py-3">
                    <VerwijderKnop type="eigenaar" id={lid.id} parentId={vveId} />
                  </td>
                </tr>
              ))}
              {leden.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-gray-400"
                  >
                    Nog geen eigenaren toegevoegd
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nieuwe eigenaar formulier */}
        {gebouwen.length > 0 && (
          <NieuweEigenaarForm gebouwen={gebouwen.map((g) => ({ id: g.id, naam: g.naam }))} />
        )}
      </div>
    </div>
  );
}

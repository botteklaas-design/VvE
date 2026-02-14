import Link from "next/link";
import { getAllVvesWithStats } from "@/lib/queries/admin";
import { Building2, Plus, Users, Home } from "lucide-react";
import { NieuweVveForm } from "@/components/admin/nieuwe-vve-form";

export default function AdminPage() {
  const vves = getAllVvesWithStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Beheer</h1>
          <p className="text-gray-500">
            Beheer VvE&apos;s, gebouwen en eigenaren
          </p>
        </div>
      </div>

      {/* VvE overzicht */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            VvE&apos;s ({vves.length})
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vves.map((vve) => (
            <Link
              key={vve.id}
              href={`/admin/vves/${vve.id}`}
              className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-50 p-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {vve.naam}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{vve.adres}</p>
                  <p className="text-sm text-gray-500">{vve.plaats}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  {vve.aantal_gebouwen} gebouwen
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {vve.aantal_eigenaren} eigenaren
                </span>
              </div>
              {vve.kvk_nummer && (
                <p className="mt-2 text-xs text-gray-400">
                  KvK: {vve.kvk_nummer}
                </p>
              )}
            </Link>
          ))}

          {/* Nieuwe VvE card */}
          <NieuweVveForm />
        </div>
      </div>
    </div>
  );
}

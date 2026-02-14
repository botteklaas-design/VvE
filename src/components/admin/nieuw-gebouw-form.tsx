"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createGebouw } from "@/actions/admin";

export function NieuwGebouwForm({ vveId }: { vveId: number }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors min-h-[120px]"
      >
        <Plus className="h-6 w-6" />
        <span className="text-sm font-medium">Nieuw gebouw</span>
      </button>
    );
  }

  return (
    <form
      action={createGebouw}
      className="rounded-xl border border-green-200 bg-white p-4 space-y-3"
    >
      <h3 className="font-semibold text-gray-900">Nieuw gebouw toevoegen</h3>
      <input type="hidden" name="vve_id" value={vveId} />
      <input
        name="naam"
        placeholder="Naam (bijv. Blok C)"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      <input
        name="adres"
        placeholder="Adres"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      <input
        name="aantal_eenheden"
        type="number"
        min="0"
        placeholder="Aantal eenheden"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Toevoegen
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Annuleren
        </button>
      </div>
    </form>
  );
}

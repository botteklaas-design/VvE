"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createVve } from "@/actions/admin";

export function NieuweVveForm() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-5 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors min-h-[160px]"
      >
        <Plus className="h-8 w-8" />
        <span className="text-sm font-medium">Nieuwe VvE</span>
      </button>
    );
  }

  return (
    <form
      action={createVve}
      className="rounded-xl border border-blue-200 bg-white p-5 space-y-3"
    >
      <h3 className="font-semibold text-gray-900">Nieuwe VvE aanmaken</h3>
      <input
        name="naam"
        placeholder="Naam VvE"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <input
        name="adres"
        placeholder="Adres"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <input
        name="plaats"
        placeholder="Plaats"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <input
        name="kvk_nummer"
        placeholder="KvK nummer (optioneel)"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Aanmaken
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

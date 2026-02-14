"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { createEigenaar } from "@/actions/admin";

interface Props {
  gebouwen: { id: number; naam: string }[];
}

export function NieuweEigenaarForm({ gebouwen }: Props) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <UserPlus className="h-4 w-4" />
        Eigenaar toevoegen
      </button>
    );
  }

  return (
    <form
      action={createEigenaar}
      className="rounded-xl border border-blue-200 bg-white p-5 space-y-3"
    >
      <h3 className="font-semibold text-gray-900">Nieuwe eigenaar toevoegen</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="naam"
          placeholder="Volledige naam"
          required
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          name="email"
          type="email"
          placeholder="E-mailadres"
          required
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          name="appartement"
          placeholder="Appartement (bijv. A-09)"
          required
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          name="gebouw_id"
          required
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Selecteer gebouw</option>
          {gebouwen.map((g) => (
            <option key={g.id} value={g.id}>
              {g.naam}
            </option>
          ))}
        </select>
        <select
          name="rol"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="lid">Lid</option>
          <option value="bestuur">Bestuur</option>
          <option value="beheerder">Beheerder</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
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

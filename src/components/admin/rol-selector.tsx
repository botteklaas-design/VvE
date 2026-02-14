"use client";

import { updateEigenaarRol } from "@/actions/admin";

const rolKleuren: Record<string, string> = {
  beheerder: "bg-purple-100 text-purple-700 border-purple-200",
  bestuur: "bg-blue-100 text-blue-700 border-blue-200",
  lid: "bg-gray-100 text-gray-700 border-gray-200",
};

export function RolSelector({
  lidId,
  currentRol,
}: {
  lidId: number;
  currentRol: string;
}) {
  return (
    <select
      value={currentRol}
      onChange={async (e) => {
        await updateEigenaarRol(lidId, e.target.value);
      }}
      className={`rounded-md border px-2 py-1 text-xs font-medium cursor-pointer ${rolKleuren[currentRol] || rolKleuren.lid}`}
    >
      <option value="lid">Lid</option>
      <option value="bestuur">Bestuur</option>
      <option value="beheerder">Beheerder</option>
    </select>
  );
}

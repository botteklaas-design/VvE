"use client";

import { useRouter } from "next/navigation";
import type { Lid } from "@/types";

export function MemberSelector({ leden }: { leden: Lid[] }) {
  const router = useRouter();

  function getCurrentLidId(): string {
    if (typeof document === "undefined") return "1";
    const match = document.cookie.match(/(?:^|; )lidId=(\d+)/);
    return match ? match[1] : "1";
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    document.cookie = `lidId=${e.target.value};path=/;max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 hidden sm:inline">Ingelogd als:</span>
      <select
        defaultValue={getCurrentLidId()}
        onChange={handleChange}
        className="h-9 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {leden.map((lid) => (
          <option key={lid.id} value={lid.id}>
            {lid.naam} ({lid.appartement})
          </option>
        ))}
      </select>
    </div>
  );
}

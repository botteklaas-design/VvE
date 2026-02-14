"use client";

import { Trash2 } from "lucide-react";
import { deleteGebouw, deleteEigenaar } from "@/actions/admin";

export function VerwijderKnop({
  type,
  id,
  parentId,
}: {
  type: "gebouw" | "eigenaar";
  id: number;
  parentId: number;
}) {
  const handleDelete = async () => {
    const label = type === "gebouw" ? "dit gebouw" : "deze eigenaar";
    if (!confirm(`Weet u zeker dat u ${label} wilt verwijderen?`)) return;

    if (type === "gebouw") {
      await deleteGebouw(id, parentId);
    } else {
      await deleteEigenaar(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
      title="Verwijderen"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

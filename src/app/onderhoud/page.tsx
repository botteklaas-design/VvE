import { getAllOnderhoud, countByStatus } from "@/lib/queries/onderhoud";
import { OnderhoudOverzicht } from "@/components/onderhoud/onderhoud-overzicht";

export default function OnderhoudPage() {
  const items = getAllOnderhoud();
  const statusCounts = countByStatus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Onderhoudsplanning
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Overzicht van alle geplande en uitgevoerde onderhoudswerkzaamheden
        </p>
      </div>

      <OnderhoudOverzicht items={items} statusCounts={statusCounts} />
    </div>
  );
}

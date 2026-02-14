import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDatumKort, statusKleuren } from "@/lib/utils";
import { Wrench } from "lucide-react";
import type { Onderhoud } from "@/types";
import Link from "next/link";

interface Props {
  items: Onderhoud[];
  geplandAantal: number;
}

export function AankomendOnderhoud({ items, geplandAantal }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Gepland onderhoud
        </CardTitle>
        <Wrench className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{geplandAantal}</div>
        <p className="text-xs text-gray-500 mt-1 mb-3">
          Lopende en geplande items
        </p>
        <div className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href="/onderhoud"
              className="flex items-center justify-between text-sm hover:bg-gray-50 rounded p-1 -mx-1"
            >
              <span className="truncate">{item.titel}</span>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <span className="text-xs text-gray-400">
                  {formatDatumKort(item.geplande_datum)}
                </span>
                <Badge className={statusKleuren[item.status]}>
                  {item.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

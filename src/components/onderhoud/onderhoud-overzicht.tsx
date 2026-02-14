"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatDatumKort,
  formatBedrag,
  statusKleuren,
  prioriteitKleuren,
} from "@/lib/utils";
import type { Onderhoud } from "@/types";
import {
  Calendar,
  CircleDot,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

const statusIcons: Record<string, React.ReactNode> = {
  gepland: <Calendar className="h-4 w-4" />,
  bezig: <CircleDot className="h-4 w-4" />,
  afgerond: <CheckCircle2 className="h-4 w-4" />,
  uitgesteld: <Clock className="h-4 w-4" />,
};

interface Props {
  items: Onderhoud[];
  statusCounts: { status: string; aantal: number }[];
}

const allStatuses = ["alle", "gepland", "bezig", "afgerond", "uitgesteld"];

export function OnderhoudOverzicht({ items, statusCounts }: Props) {
  const [filter, setFilter] = useState("alle");

  const filteredItems =
    filter === "alle" ? items : items.filter((i) => i.status === filter);

  const getCount = (status: string) => {
    if (status === "alle") return items.length;
    return statusCounts.find((s) => s.status === status)?.aantal ?? 0;
  };

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        {allStatuses.map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({getCount(status)})
          </Button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-blue-500"
              style={{
                backgroundColor: item.status === 'afgerond' ? '#10b981' :
                  item.status === 'bezig' ? '#f59e0b' :
                  item.status === 'uitgesteld' ? '#6b7280' : '#3b82f6'
              }}
            />
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  {statusIcons[item.status]}
                  <CardTitle className="text-base">{item.titel}</CardTitle>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Badge className={prioriteitKleuren[item.prioriteit]}>
                    {item.prioriteit}
                  </Badge>
                  <Badge className={statusKleuren[item.status]}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {item.omschrijving && (
                <p className="text-sm text-gray-600 mb-3">
                  {item.omschrijving}
                </p>
              )}
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                <span>
                  Gepland: {formatDatumKort(item.geplande_datum)}
                </span>
                {item.afgerond_datum && (
                  <span>
                    Afgerond: {formatDatumKort(item.afgerond_datum)}
                  </span>
                )}
                {item.geschatte_kosten != null && (
                  <span>
                    Geschat: {formatBedrag(item.geschatte_kosten)}
                  </span>
                )}
                {item.werkelijke_kosten != null && (
                  <span>
                    Werkelijk: {formatBedrag(item.werkelijke_kosten)}
                  </span>
                )}
                {item.geschatte_kosten != null &&
                  item.werkelijke_kosten != null && (
                    <span
                      className={
                        item.werkelijke_kosten > item.geschatte_kosten
                          ? "text-red-500 flex items-center gap-1"
                          : "text-green-500"
                      }
                    >
                      {item.werkelijke_kosten > item.geschatte_kosten && (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      {(
                        ((item.werkelijke_kosten - item.geschatte_kosten) /
                          item.geschatte_kosten) *
                        100
                      ).toFixed(0)}
                      % t.o.v. begroting
                    </span>
                  )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredItems.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Geen onderhoudswerkzaamheden gevonden voor dit filter.
          </p>
        )}
      </div>
    </div>
  );
}

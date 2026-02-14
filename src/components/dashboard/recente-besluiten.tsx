import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statusKleuren } from "@/lib/utils";
import { Vote } from "lucide-react";
import type { Besluit } from "@/types";
import Link from "next/link";

interface Props {
  besluiten: Besluit[];
}

export function RecenteBesluiten({ besluiten }: Props) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Vote className="h-5 w-5" />
          Recente besluiten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {besluiten.map((besluit) => (
            <Link
              key={besluit.id}
              href={`/besluitvorming/${besluit.id}`}
              className="flex items-start justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">
                  {besluit.titel}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Ingediend door {besluit.indiener_naam}
                </p>
              </div>
              <Badge className={`ml-2 shrink-0 ${statusKleuren[besluit.status]}`}>
                {besluit.status}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

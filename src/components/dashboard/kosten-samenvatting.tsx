import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBedrag } from "@/lib/utils";
import { Euro, TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  totaalDitJaar: number;
  totaalVorigJaar: number;
}

export function KostenSamenvatting({ totaalDitJaar, totaalVorigJaar }: Props) {
  const verschil = totaalVorigJaar > 0
    ? ((totaalDitJaar - totaalVorigJaar) / totaalVorigJaar) * 100
    : 0;
  const isHoger = verschil > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Totale kosten dit jaar
        </CardTitle>
        <Euro className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatBedrag(totaalDitJaar)}</div>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          {isHoger ? (
            <TrendingUp className="h-3 w-3 text-red-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-green-500" />
          )}
          <span className={isHoger ? "text-red-500" : "text-green-500"}>
            {Math.abs(verschil).toFixed(1)}%
          </span>{" "}
          t.o.v. vorig jaar
        </p>
      </CardContent>
    </Card>
  );
}

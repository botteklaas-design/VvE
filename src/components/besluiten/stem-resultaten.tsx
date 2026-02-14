"use client";

import { Progress } from "@/components/ui/progress";
import type { StemResultaat } from "@/types";

interface Props {
  resultaat: StemResultaat;
  totaalLeden: number;
}

export function StemResultaten({ resultaat, totaalLeden }: Props) {
  const opkomst =
    totaalLeden > 0
      ? ((resultaat.totaal / totaalLeden) * 100).toFixed(0)
      : "0";

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Opkomst: {resultaat.totaal} van {totaalLeden} leden</span>
        <span>{opkomst}%</span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-green-700 font-medium">Voor</span>
            <span className="text-green-700">
              {resultaat.voor}{" "}
              {resultaat.totaal > 0 &&
                `(${((resultaat.voor / resultaat.totaal) * 100).toFixed(0)}%)`}
            </span>
          </div>
          <Progress
            value={
              resultaat.totaal > 0
                ? (resultaat.voor / resultaat.totaal) * 100
                : 0
            }
            className="h-3"
            indicatorClassName="bg-green-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-700 font-medium">Tegen</span>
            <span className="text-red-700">
              {resultaat.tegen}{" "}
              {resultaat.totaal > 0 &&
                `(${((resultaat.tegen / resultaat.totaal) * 100).toFixed(0)}%)`}
            </span>
          </div>
          <Progress
            value={
              resultaat.totaal > 0
                ? (resultaat.tegen / resultaat.totaal) * 100
                : 0
            }
            className="h-3"
            indicatorClassName="bg-red-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700 font-medium">Onthouding</span>
            <span className="text-gray-700">
              {resultaat.onthouding}{" "}
              {resultaat.totaal > 0 &&
                `(${((resultaat.onthouding / resultaat.totaal) * 100).toFixed(0)}%)`}
            </span>
          </div>
          <Progress
            value={
              resultaat.totaal > 0
                ? (resultaat.onthouding / resultaat.totaal) * 100
                : 0
            }
            className="h-3"
            indicatorClassName="bg-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

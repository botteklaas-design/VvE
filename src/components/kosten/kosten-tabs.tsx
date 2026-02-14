"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaandelijksChart } from "./maandelijks-chart";
import { CategorieChart } from "./categorie-chart";
import { JaarVergelijkingChart } from "./jaar-vergelijking-chart";
import { maandNamen } from "@/lib/utils";

interface Props {
  monthlyCosts: { maand: number; totaal: number }[];
  categoryCosts: { naam: string; totaal: number }[];
  yearComparison: { maand: number; jaar2024: number; jaar2025: number }[];
  details: { categorie_naam: string; maand: number; bedrag: number }[];
  currentYear: number;
}

export function KostenTabs({
  monthlyCosts,
  categoryCosts,
  yearComparison,
  details,
  currentYear,
}: Props) {
  return (
    <Tabs defaultValue="maandoverzicht">
      <TabsList>
        <TabsTrigger value="maandoverzicht">Maandoverzicht</TabsTrigger>
        <TabsTrigger value="categorie">Per categorie</TabsTrigger>
        <TabsTrigger value="vergelijking">Jaarvergelijking</TabsTrigger>
      </TabsList>

      <TabsContent value="maandoverzicht">
        <Card>
          <CardHeader>
            <CardTitle>Maandelijkse kosten {currentYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <MaandelijksChart data={monthlyCosts} />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-gray-500">
                      Maand
                    </th>
                    <th className="text-right py-2 font-medium text-gray-500">
                      Totaal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyCosts.map((row) => (
                    <tr
                      key={row.maand}
                      className="border-b border-gray-100"
                    >
                      <td className="py-2">{maandNamen[row.maand - 1]}</td>
                      <td className="py-2 text-right font-medium">
                        &euro;{Math.round(row.totaal).toLocaleString("nl-NL")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="categorie">
        <Card>
          <CardHeader>
            <CardTitle>Kosten per categorie {currentYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <CategorieChart data={categoryCosts} />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-gray-500">
                      Categorie
                    </th>
                    <th className="text-right py-2 font-medium text-gray-500">
                      Totaal
                    </th>
                    <th className="text-right py-2 font-medium text-gray-500">
                      Aandeel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryCosts.map((row) => {
                    const totaal = categoryCosts.reduce(
                      (sum, r) => sum + r.totaal,
                      0
                    );
                    return (
                      <tr
                        key={row.naam}
                        className="border-b border-gray-100"
                      >
                        <td className="py-2">{row.naam}</td>
                        <td className="py-2 text-right font-medium">
                          &euro;
                          {Math.round(row.totaal).toLocaleString("nl-NL")}
                        </td>
                        <td className="py-2 text-right text-gray-500">
                          {((row.totaal / totaal) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="vergelijking">
        <Card>
          <CardHeader>
            <CardTitle>Jaarvergelijking 2024 vs 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <JaarVergelijkingChart data={yearComparison} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

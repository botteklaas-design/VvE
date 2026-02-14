import {
  getMonthlyCosts,
  getCostsByCategory,
  getYearComparison,
  getTotalCosts,
  getCostDetails,
} from "@/lib/queries/kosten";
import { MaandelijksChart } from "@/components/kosten/maandelijks-chart";
import { CategorieChart } from "@/components/kosten/categorie-chart";
import { JaarVergelijkingChart } from "@/components/kosten/jaar-vergelijking-chart";
import { KostenTabs } from "@/components/kosten/kosten-tabs";
import { formatBedrag, maandNamen } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function KosteninzichtPage() {
  const currentYear = new Date().getFullYear();
  const monthlyCosts = getMonthlyCosts(currentYear);
  const categoryCosts = getCostsByCategory(currentYear);
  const yearComparison = getYearComparison();
  const totalThisYear = getTotalCosts(currentYear);
  const totalLastYear = getTotalCosts(currentYear - 1);
  const details = getCostDetails(currentYear);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kosteninzicht</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overzicht van alle VvE-kosten en -uitgaven
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Totaal {currentYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBedrag(totalThisYear)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Totaal {currentYear - 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBedrag(totalLastYear)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Gemiddeld per maand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBedrag(
                monthlyCosts.length > 0
                  ? totalThisYear / monthlyCosts.length
                  : 0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs with charts */}
      <KostenTabs
        monthlyCosts={monthlyCosts}
        categoryCosts={categoryCosts}
        yearComparison={yearComparison}
        details={details}
        currentYear={currentYear}
      />
    </div>
  );
}

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { maandNamen } from "@/lib/utils";

interface Props {
  data: { maand: number; totaal: number }[];
}

export function MaandelijksChart({ data }: Props) {
  const chartData = data.map((d) => ({
    naam: maandNamen[d.maand - 1],
    totaal: Math.round(d.totaal),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="naam" />
        <YAxis
          tickFormatter={(value: number) =>
            `\u20AC${value.toLocaleString("nl-NL")}`
          }
        />
        <Tooltip
          formatter={(value: number) => [
            `\u20AC${value.toLocaleString("nl-NL")}`,
            "Totaal",
          ]}
        />
        <Bar dataKey="totaal" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

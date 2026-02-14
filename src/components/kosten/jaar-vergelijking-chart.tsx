"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { maandNamen } from "@/lib/utils";

interface Props {
  data: { maand: number; jaar2024: number; jaar2025: number }[];
}

export function JaarVergelijkingChart({ data }: Props) {
  const chartData = data.map((d) => ({
    naam: maandNamen[d.maand - 1],
    "2024": Math.round(d.jaar2024),
    "2025": Math.round(d.jaar2025),
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
          formatter={(value: number, name: string) => [
            `\u20AC${value.toLocaleString("nl-NL")}`,
            name,
          ]}
        />
        <Legend />
        <Bar dataKey="2024" fill="#94a3b8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="2025" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

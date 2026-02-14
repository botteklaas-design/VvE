"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

interface Props {
  data: { naam: string; totaal: number }[];
}

export function CategorieChart({ data }: Props) {
  const chartData = data.map((d) => ({
    naam: d.naam,
    waarde: Math.round(d.totaal),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="waarde"
          nameKey="naam"
          label={({ naam, percent }: { naam: string; percent: number }) =>
            `${naam} ${(percent * 100).toFixed(0)}%`
          }
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [
            `\u20AC${value.toLocaleString("nl-NL")}`,
          ]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

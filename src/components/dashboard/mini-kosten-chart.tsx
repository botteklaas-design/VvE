"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { maandNamen } from "@/lib/utils";

interface Props {
  data: { maand: number; totaal: number }[];
}

export function MiniKostenChart({ data }: Props) {
  const chartData = data.map((d) => ({
    naam: maandNamen[d.maand - 1],
    totaal: Math.round(d.totaal),
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorTotaal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="naam" tick={{ fontSize: 12 }} />
        <YAxis hide />
        <Tooltip
          formatter={(value: number) => [
            `\u20AC${value.toLocaleString("nl-NL")}`,
            "Kosten",
          ]}
        />
        <Area
          type="monotone"
          dataKey="totaal"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorTotaal)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket } from "lucide-react";

interface Props {
  aantal: number;
}

export function OpenTickets({ aantal }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Open tickets</CardTitle>
        <Ticket className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{aantal}</div>
        <p className="text-xs text-gray-500 mt-1">
          Wachtend op afhandeling
        </p>
      </CardContent>
    </Card>
  );
}

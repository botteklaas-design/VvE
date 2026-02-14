"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { castVote } from "@/actions/besluiten";
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";

interface Props {
  besluitId: number;
  lidId: number;
  huidigeStem?: string;
}

export function StemFormulier({ besluitId, lidId, huidigeStem }: Props) {
  const [loading, setLoading] = useState(false);
  const [geselecteerd, setGeselecteerd] = useState<string | null>(
    huidigeStem || null
  );

  async function handleVote(stem: "voor" | "tegen" | "onthouding") {
    setLoading(true);
    try {
      await castVote(besluitId, lidId, stem);
      setGeselecteerd(stem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">
        {huidigeStem
          ? "Je hebt al gestemd. Je kunt je stem wijzigen:"
          : "Breng je stem uit:"}
      </p>
      <div className="flex gap-3">
        <Button
          variant={geselecteerd === "voor" ? "default" : "outline"}
          onClick={() => handleVote("voor")}
          disabled={loading}
          className={
            geselecteerd === "voor"
              ? "bg-green-600 hover:bg-green-700"
              : ""
          }
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Voor
        </Button>
        <Button
          variant={geselecteerd === "tegen" ? "default" : "outline"}
          onClick={() => handleVote("tegen")}
          disabled={loading}
          className={
            geselecteerd === "tegen"
              ? "bg-red-600 hover:bg-red-700"
              : ""
          }
        >
          <ThumbsDown className="h-4 w-4 mr-2" />
          Tegen
        </Button>
        <Button
          variant={geselecteerd === "onthouding" ? "default" : "outline"}
          onClick={() => handleVote("onthouding")}
          disabled={loading}
          className={
            geselecteerd === "onthouding"
              ? "bg-gray-600 hover:bg-gray-700"
              : ""
          }
        >
          <Minus className="h-4 w-4 mr-2" />
          Onthouding
        </Button>
      </div>
    </div>
  );
}

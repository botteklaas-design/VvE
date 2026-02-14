"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { updateTicketStatus } from "@/actions/tickets";

interface Props {
  ticketId: number;
  huidigeStatus: string;
}

const statussen = [
  { value: "open", label: "Open" },
  { value: "in_behandeling", label: "In behandeling" },
  { value: "afgerond", label: "Afgerond" },
  { value: "afgewezen", label: "Afgewezen" },
];

export function StatusUpdate({ ticketId, huidigeStatus }: Props) {
  const [status, setStatus] = useState(huidigeStatus);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (status === huidigeStatus) return;
    setLoading(true);
    try {
      await updateTicketStatus(ticketId, status);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-48"
      >
        {statussen.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </Select>
      <Button
        size="sm"
        onClick={handleUpdate}
        disabled={loading || status === huidigeStatus}
      >
        {loading ? "Opslaan..." : "Bijwerken"}
      </Button>
    </div>
  );
}

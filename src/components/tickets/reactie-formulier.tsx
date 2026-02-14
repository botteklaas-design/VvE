"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addTicketComment } from "@/actions/tickets";

interface Props {
  ticketId: number;
  lidId: number;
}

export function ReactieFormulier({ ticketId, lidId }: Props) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const bericht = formData.get("bericht") as string;
    if (!bericht.trim()) return;

    setLoading(true);
    try {
      await addTicketComment(ticketId, lidId, bericht);
      form.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        name="bericht"
        placeholder="Schrijf een reactie..."
        rows={3}
        required
      />
      <Button type="submit" size="sm" disabled={loading}>
        {loading ? "Versturen..." : "Reactie plaatsen"}
      </Button>
    </form>
  );
}

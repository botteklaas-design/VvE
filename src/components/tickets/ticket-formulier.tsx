"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  lidId: number;
  createTicket: (formData: FormData) => Promise<void>;
}

export function TicketFormulier({ lidId, createTicket }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Ticket gegevens</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createTicket} className="space-y-4">
          <input type="hidden" name="lidId" value={lidId} />

          <div className="space-y-2">
            <label
              htmlFor="titel"
              className="text-sm font-medium text-gray-700"
            >
              Titel *
            </label>
            <Input
              id="titel"
              name="titel"
              placeholder="Korte beschrijving van het probleem"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="omschrijving"
              className="text-sm font-medium text-gray-700"
            >
              Omschrijving *
            </label>
            <Textarea
              id="omschrijving"
              name="omschrijving"
              placeholder="Geef een uitgebreide beschrijving..."
              rows={5}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="categorie"
                className="text-sm font-medium text-gray-700"
              >
                Categorie
              </label>
              <Select id="categorie" name="categorie" defaultValue="reparatie">
                <option value="reparatie">Reparatie</option>
                <option value="klacht">Klacht</option>
                <option value="verzoek">Verzoek</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="prioriteit"
                className="text-sm font-medium text-gray-700"
              >
                Prioriteit
              </label>
              <Select id="prioriteit" name="prioriteit" defaultValue="normaal">
                <option value="laag">Laag</option>
                <option value="normaal">Normaal</option>
                <option value="hoog">Hoog</option>
                <option value="urgent">Urgent</option>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit">Ticket indienen</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

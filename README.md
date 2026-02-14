# VvE Transparantieportaal

Dashboard voor VvE-leden (Vereniging van Eigenaren) met kosteninzicht, onderhoudsplanning, besluitvorming en ticketing.

## Functionaliteiten

- **Dashboard** - Overzicht met kosten, onderhoud, besluiten en tickets
- **Kosteninzicht** - Financieel overzicht met maandelijkse/jaarlijkse charts en categorieanalyse
- **Onderhoudsplanning** - Timeline van gepland en uitgevoerd onderhoud met status tracking
- **Besluitvorming** - Voorstellen indienen, stemmen, resultaten bekijken, notulen
- **Ticketing** - Meldingen, reparatieverzoeken en klachten indienen en volgen

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- SQLite (better-sqlite3)
- Recharts

## Aan de slag

```bash
npm install
npm run dev
```

De database wordt automatisch aangemaakt en gevuld met testdata bij de eerste keer starten.

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Database resetten

Bezoek `/api/seed` in development om de database opnieuw te vullen met testdata, of verwijder `data/vve.db` en herstart de server.

## Projectstructuur

```
src/
  app/                    # Next.js pagina's en routes
    kosteninzicht/        # Financieel overzicht
    onderhoud/            # Onderhoudsplanning
    besluitvorming/       # Besluitvorming en stemmen
    tickets/              # Ticketing systeem
  components/             # React componenten
    ui/                   # Basis UI componenten
    layout/               # Sidebar, header, navigatie
    dashboard/            # Dashboard widgets
    kosten/               # Kosten charts
    onderhoud/            # Onderhoud componenten
    besluiten/            # Besluitvorming componenten
    tickets/              # Ticket componenten
  lib/                    # Database en utilities
    queries/              # Database queries per domein
  actions/                # Server Actions
  types/                  # TypeScript types
```

## Context

Gebouwd naar aanleiding van structurele frustratie over onduidelijke kosten en trage reparaties binnen VvE-beheer. Bronnen: [Radar](https://radar.avrotros.nl) en [Reddit](https://www.reddit.com/r/Netherlands/comments/1nobdvb/do_you_also_get_frustrated_with_how_your_vve/).

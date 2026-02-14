import type Database from "better-sqlite3";

export function seedDatabase(db: Database.Database) {
  // Check if already seeded
  const count = db.prepare("SELECT COUNT(*) as c FROM leden").get() as { c: number };
  if (count.c > 0) return;

  const insertVve = db.prepare(
    "INSERT INTO vves (naam, adres, plaats, kvk_nummer) VALUES (?, ?, ?, ?)"
  );
  const insertGebouw = db.prepare(
    "INSERT INTO gebouwen (vve_id, naam, adres, aantal_eenheden) VALUES (?, ?, ?, ?)"
  );
  const insertLid = db.prepare(
    "INSERT INTO leden (naam, email, appartement, rol, gebouw_id) VALUES (?, ?, ?, ?, ?)"
  );
  const insertCategorie = db.prepare(
    "INSERT INTO kostencategorieen (naam) VALUES (?)"
  );
  const insertKost = db.prepare(
    "INSERT INTO kosten (categorie_id, bedrag, maand, jaar, omschrijving) VALUES (?, ?, ?, ?, ?)"
  );
  const insertOnderhoud = db.prepare(
    "INSERT INTO onderhoud (titel, omschrijving, status, prioriteit, geplande_datum, afgerond_datum, geschatte_kosten, werkelijke_kosten) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const insertBesluit = db.prepare(
    "INSERT INTO besluiten (titel, omschrijving, status, categorie, ingediend_door, vergadering_datum, notulen, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const insertStem = db.prepare(
    "INSERT INTO stemmen (besluit_id, lid_id, stem) VALUES (?, ?, ?)"
  );
  const insertTicket = db.prepare(
    "INSERT INTO tickets (titel, omschrijving, categorie, status, prioriteit, ingediend_door, toegewezen_aan) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  const insertReactie = db.prepare(
    "INSERT INTO ticket_reacties (ticket_id, lid_id, bericht) VALUES (?, ?, ?)"
  );

  const seedAll = db.transaction(() => {
    // VvE's
    insertVve.run("VvE Zonnepark Residence", "Zonnelaan 1-40", "Amsterdam", "12345678");
    insertVve.run("VvE De Waterkant", "Waterkantweg 1-24", "Rotterdam", "87654321");

    // Gebouwen
    insertGebouw.run(1, "Blok A", "Zonnelaan 1-20", 8);
    insertGebouw.run(1, "Blok B", "Zonnelaan 21-40", 6);
    insertGebouw.run(2, "Toren 1", "Waterkantweg 1-12", 12);

    // Leden
    insertLid.run("Jan de Vries", "jan@vve-zonnepark.nl", "A-01", "bestuur", 1);
    insertLid.run("Maria Jansen", "maria@vve-zonnepark.nl", "A-02", "bestuur", 1);
    insertLid.run(
      "Pieter Bakker",
      "pieter@vve-zonnepark.nl",
      "A-03",
      "beheerder",
      1
    );
    insertLid.run("Sophie van Dijk", "sophie@vve-zonnepark.nl", "A-04", "lid", 1);
    insertLid.run(
      "Ahmed El Amrani",
      "ahmed@vve-zonnepark.nl",
      "A-05",
      "lid",
      2
    );
    insertLid.run("Lisa Mulder", "lisa@vve-zonnepark.nl", "A-06", "lid", 2);
    insertLid.run("Tom Visser", "tom@vve-zonnepark.nl", "A-07", "lid", 2);
    insertLid.run("Eva Hendriks", "eva@vve-zonnepark.nl", "A-08", "lid", 2);

    // Kostencategorieen
    insertCategorie.run("Schoonmaak");
    insertCategorie.run("Verzekering");
    insertCategorie.run("Energie");
    insertCategorie.run("Tuinonderhoud");
    insertCategorie.run("Liftonderhoud");
    insertCategorie.run("Reservefonds");

    // Kosten - 2024 en 2025 per maand
    const baseKosten: Record<number, { base: number; variance: number }> = {
      1: { base: 450, variance: 50 }, // Schoonmaak
      2: { base: 380, variance: 20 }, // Verzekering
      3: { base: 620, variance: 150 }, // Energie (seizoensafhankelijk)
      4: { base: 280, variance: 100 }, // Tuinonderhoud (seizoensafhankelijk)
      5: { base: 350, variance: 30 }, // Liftonderhoud
      6: { base: 500, variance: 0 }, // Reservefonds
    };

    for (const jaar of [2024, 2025]) {
      for (let maand = 1; maand <= 12; maand++) {
        // Skip toekomstige maanden in 2025
        if (jaar === 2025 && maand > 2) continue;

        for (const [catId, config] of Object.entries(baseKosten)) {
          let bedrag = config.base;

          // Seizoensvariatie voor energie
          if (Number(catId) === 3) {
            const seizoensFactor =
              maand <= 3 || maand >= 10 ? 1.4 : maand >= 5 && maand <= 8 ? 0.6 : 1.0;
            bedrag = config.base * seizoensFactor;
          }

          // Seizoensvariatie voor tuinonderhoud
          if (Number(catId) === 4) {
            const tuinFactor =
              maand >= 4 && maand <= 9 ? 1.5 : 0.5;
            bedrag = config.base * tuinFactor;
          }

          // Random variatie
          const variatie = (Math.random() - 0.5) * 2 * config.variance;
          bedrag = Math.round((bedrag + variatie) * 100) / 100;

          insertKost.run(Number(catId), bedrag, maand, jaar, null);
        }
      }
    }

    // Onderhoud
    insertOnderhoud.run(
      "Dakrenovatie blok A",
      "Volledige renovatie van het dak van blok A inclusief isolatie",
      "afgerond",
      "hoog",
      "2024-03-15",
      "2024-05-20",
      25000,
      27500
    );
    insertOnderhoud.run(
      "Liftkeuring 2024",
      "Jaarlijkse verplichte liftkeuring door gecertificeerd bedrijf",
      "afgerond",
      "hoog",
      "2024-06-01",
      "2024-06-01",
      800,
      800
    );
    insertOnderhoud.run(
      "Schilderwerk trappenhuizen",
      "Schilderen van alle trappenhuizen en gemeenschappelijke gangen",
      "afgerond",
      "normaal",
      "2024-09-01",
      "2024-10-15",
      8500,
      9200
    );
    insertOnderhoud.run(
      "CV-ketel onderhoud",
      "Jaarlijks onderhoud van de gemeenschappelijke CV-installatie",
      "bezig",
      "hoog",
      "2025-01-15",
      null,
      1200,
      null
    );
    insertOnderhoud.run(
      "Gevelreiniging",
      "Professionele reiniging van alle gevels",
      "bezig",
      "normaal",
      "2025-02-01",
      null,
      4500,
      null
    );
    insertOnderhoud.run(
      "Vervanging intercomsysteem",
      "Upgrade naar modern video-intercomsysteem voor alle appartementen",
      "gepland",
      "normaal",
      "2025-04-01",
      null,
      12000,
      null
    );
    insertOnderhoud.run(
      "Dakgoot reiniging",
      "Reiniging en inspectie van alle dakgoten",
      "gepland",
      "laag",
      "2025-05-15",
      null,
      650,
      null
    );
    insertOnderhoud.run(
      "Bestrating parkeerplaats",
      "Herbestraten van de gezamenlijke parkeerplaats",
      "gepland",
      "normaal",
      "2025-07-01",
      null,
      15000,
      null
    );
    insertOnderhoud.run(
      "Liftkeuring 2025",
      "Jaarlijkse verplichte liftkeuring",
      "uitgesteld",
      "hoog",
      "2025-01-15",
      null,
      800,
      null
    );
    insertOnderhoud.run(
      "Brandveiligheid inspectie",
      "Inspectie en vervanging brandmelders en blusapparaten",
      "uitgesteld",
      "urgent",
      "2025-02-01",
      null,
      2200,
      null
    );

    // Besluiten
    insertBesluit.run(
      "Verhoging reservefondsbijdrage",
      "Voorstel om de maandelijkse bijdrage aan het reservefonds te verhogen van €500 naar €650 per maand om de meerjarenonderhoudsplanning te kunnen financieren.",
      "aangenomen",
      "financieel",
      1,
      "2024-11-15",
      "Tijdens de ALV van 15 november 2024 is het voorstel besproken. Na uitvoerige discussie over de noodzaak van het verhogen van het reservefonds is er gestemd. Het voorstel is aangenomen met ruime meerderheid.",
      "2024-11-15"
    );
    insertBesluit.run(
      "Aanleg fietsenstalling",
      "Voorstel voor de aanleg van een overdekte fietsenstalling op het binnenterrein. Geschatte kosten: €8.000.",
      "afgewezen",
      "algemeen",
      4,
      "2024-11-15",
      "Het voorstel is besproken tijdens de ALV. Meerdere leden gaven aan dat de parkeerplaats niet opgeofferd mag worden voor een fietsenstalling. Het voorstel is verworpen.",
      "2024-11-15"
    );
    insertBesluit.run(
      "Plaatsing zonnepanelen",
      "Voorstel om zonnepanelen te plaatsen op het dak van blok A en B. Verwachte investering: €35.000. Terugverdientijd: 7-9 jaar.",
      "stemmen",
      "financieel",
      1,
      null,
      null,
      "2025-03-01"
    );
    insertBesluit.run(
      "Wijziging huishoudelijk reglement",
      "Voorstel om het huishoudelijk reglement aan te passen met betrekking tot geluidsoverlast. Voorstel: stilte na 22:00 in plaats van 23:00.",
      "open",
      "reglement",
      2,
      null,
      null,
      null
    );
    insertBesluit.run(
      "Renovatie gemeenschappelijke tuin",
      "Voorstel om de gemeenschappelijke tuin te herinrichten met nieuwe beplanting, een zithoek en verlichting. Geschatte kosten: €5.500.",
      "open",
      "onderhoud",
      6,
      null,
      null,
      null
    );

    // Stemmen voor besluit 1 (aangenomen)
    insertStem.run(1, 1, "voor");
    insertStem.run(1, 2, "voor");
    insertStem.run(1, 3, "voor");
    insertStem.run(1, 4, "voor");
    insertStem.run(1, 5, "tegen");
    insertStem.run(1, 6, "voor");
    insertStem.run(1, 7, "onthouding");
    insertStem.run(1, 8, "voor");

    // Stemmen voor besluit 2 (afgewezen)
    insertStem.run(2, 1, "tegen");
    insertStem.run(2, 2, "tegen");
    insertStem.run(2, 3, "tegen");
    insertStem.run(2, 4, "voor");
    insertStem.run(2, 5, "voor");
    insertStem.run(2, 6, "tegen");
    insertStem.run(2, 7, "tegen");
    insertStem.run(2, 8, "onthouding");

    // Stemmen voor besluit 3 (stemmen - gedeeltelijk)
    insertStem.run(3, 1, "voor");
    insertStem.run(3, 2, "voor");
    insertStem.run(3, 5, "tegen");
    insertStem.run(3, 6, "voor");

    // Tickets
    insertTicket.run(
      "Lekkage badkamer A-03",
      "Er lekt water vanuit het plafond van de badkamer. Waarschijnlijk een lek in de leiding van de bovenbuur. Er ontstaat al schimmel.",
      "reparatie",
      "in_behandeling",
      "hoog",
      3,
      3
    );
    insertTicket.run(
      "Kapotte intercom",
      "De intercom bij de voordeur werkt niet meer. Bezoekers kunnen niet meer aanbellen.",
      "reparatie",
      "open",
      "normaal",
      5,
      null
    );
    insertTicket.run(
      "Verlichting parkeergarage",
      "Meerdere TL-buizen in de parkeergarage zijn kapot. Het is erg donker en onveilig.",
      "reparatie",
      "afgerond",
      "hoog",
      7,
      3
    );
    insertTicket.run(
      "Overlast buren A-07",
      "Regelmatig geluidsoverlast na 23:00 vanuit appartement A-07. Meerdere keren al aangesproken maar zonder resultaat.",
      "klacht",
      "in_behandeling",
      "normaal",
      6,
      1
    );
    insertTicket.run(
      "Verzoek extra fietsenrek",
      "De huidige fietsenrekken zijn constant vol. Graag extra fietsenrekken plaatsen bij ingang B.",
      "verzoek",
      "open",
      "laag",
      4,
      null
    );
    insertTicket.run(
      "Losliggende stoeptegel",
      "Bij de hoofdingang liggen meerdere stoeptegels los. Gevaarlijk voor oudere bewoners.",
      "reparatie",
      "open",
      "hoog",
      8,
      null
    );
    insertTicket.run(
      "Stankoverlast afvalcontainer",
      "De afvalcontainer bij ingang A veroorzaakt stankoverlast, vooral in de zomer. Verzoek om vaker te laten legen.",
      "klacht",
      "afgerond",
      "normaal",
      5,
      3
    );
    insertTicket.run(
      "Verzoek oplaadpaal",
      "Graag een oplaadpaal voor elektrische auto's op de parkeerplaats. Meerdere bewoners hebben inmiddels een EV.",
      "verzoek",
      "open",
      "normaal",
      7,
      null
    );

    // Ticket reacties
    insertReactie.run(
      1,
      3,
      "Ik heb een loodgieter ingeschakeld. Deze komt dinsdag a.s. langs om de lekkage te inspecteren."
    );
    insertReactie.run(
      1,
      3,
      "De loodgieter heeft het lek gelokaliseerd. Het betreft een lekkende koppeling in de stijgleiding. Reparatie staat gepland voor donderdag."
    );
    insertReactie.run(
      3,
      3,
      "Alle TL-buizen zijn vervangen. Tevens LED-verlichting geplaatst voor energiebesparing."
    );
    insertReactie.run(
      3,
      7,
      "Bedankt, het is nu veel beter verlicht!"
    );
    insertReactie.run(
      4,
      1,
      "Ik heb een brief gestuurd naar de bewoner van A-07 met het verzoek om het geluid na 22:00 te beperken."
    );
    insertReactie.run(
      7,
      3,
      "De containerservice is gecontacteerd. Frequentie wordt verhoogd naar 2x per week in de zomermaanden."
    );
    insertReactie.run(
      7,
      5,
      "Dank voor de snelle actie!"
    );
  });

  seedAll();
}

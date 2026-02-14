import type Database from "better-sqlite3";

export function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leden (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      naam          TEXT NOT NULL,
      email         TEXT NOT NULL UNIQUE,
      appartement   TEXT NOT NULL,
      rol           TEXT NOT NULL DEFAULT 'lid',
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS kostencategorieen (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      naam  TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS kosten (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      categorie_id  INTEGER NOT NULL REFERENCES kostencategorieen(id),
      bedrag        REAL NOT NULL,
      maand         INTEGER NOT NULL,
      jaar          INTEGER NOT NULL,
      omschrijving  TEXT,
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS onderhoud (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      titel             TEXT NOT NULL,
      omschrijving      TEXT,
      status            TEXT NOT NULL DEFAULT 'gepland',
      prioriteit        TEXT NOT NULL DEFAULT 'normaal',
      geplande_datum    TEXT NOT NULL,
      afgerond_datum    TEXT,
      geschatte_kosten  REAL,
      werkelijke_kosten REAL,
      created_at        TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS besluiten (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      titel             TEXT NOT NULL,
      omschrijving      TEXT NOT NULL,
      status            TEXT NOT NULL DEFAULT 'open',
      categorie         TEXT NOT NULL DEFAULT 'algemeen',
      ingediend_door    INTEGER NOT NULL REFERENCES leden(id),
      vergadering_datum TEXT,
      notulen           TEXT,
      deadline          TEXT,
      created_at        TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS stemmen (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      besluit_id  INTEGER NOT NULL REFERENCES besluiten(id),
      lid_id      INTEGER NOT NULL REFERENCES leden(id),
      stem        TEXT NOT NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(besluit_id, lid_id)
    );

    CREATE TABLE IF NOT EXISTS tickets (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      titel           TEXT NOT NULL,
      omschrijving    TEXT NOT NULL,
      categorie       TEXT NOT NULL DEFAULT 'reparatie',
      status          TEXT NOT NULL DEFAULT 'open',
      prioriteit      TEXT NOT NULL DEFAULT 'normaal',
      ingediend_door  INTEGER NOT NULL REFERENCES leden(id),
      toegewezen_aan  INTEGER REFERENCES leden(id),
      created_at      TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ticket_reacties (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id   INTEGER NOT NULL REFERENCES tickets(id),
      lid_id      INTEGER NOT NULL REFERENCES leden(id),
      bericht     TEXT NOT NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

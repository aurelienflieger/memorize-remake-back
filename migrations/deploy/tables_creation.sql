-- Deploy memorize:tables_creation to pg

BEGIN;

CREATE DOMAIN EMAIL AS TEXT NOT NULL
CHECK (
  VALUE ~ '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
);

CREATE DOMAIN DIFFICULTY_CHECK AS INT NOT NULL DEFAULT 0 
CHECK (
  VALUE >= 0 AND VALUE <= 32
);

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" EMAIL UNIQUE,
  "password" TEXT NOT NULL,
  "username" TEXT NOT NULL
);

CREATE TABLE "deck" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "user_id" INT NOT NULL REFERENCES "user"("id")
);

CREATE TABLE "card" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "difficulty" DIFFICULTY_CHECK,
    "deck_id" INT NOT NULL REFERENCES "deck"("id")
);


COMMIT;

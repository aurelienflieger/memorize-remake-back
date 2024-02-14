-- Verify memorize:tables_creation on pg

BEGIN;

SELECT * FROM "user" WHERE false;

SELECT * FROM "card" WHERE false;

SELECT * FROM "deck" WHERE false;

ROLLBACK;

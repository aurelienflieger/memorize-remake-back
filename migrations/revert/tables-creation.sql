-- Revert memorize:tables_creation from pg

BEGIN;

DROP TABLE "user", "deck", "card";
DROP DOMAIN DIFFICULTY_CHECK;

COMMIT;

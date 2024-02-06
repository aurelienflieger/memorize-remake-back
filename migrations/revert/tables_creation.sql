-- Revert memorize:tables_creation from pg

BEGIN;

DROP TABLE "user", "deck", "card";
DROP DOMAIN EMAIL, DIFFICULTY_CHECK;

COMMIT;

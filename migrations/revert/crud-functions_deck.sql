-- Revert memorize:crud-functions_deck from pg
BEGIN;

DROP FUNCTION create_deck(json);

DROP FUNCTION update_deck(json);

DROP FUNCTION delete_deck(INT);

COMMIT;
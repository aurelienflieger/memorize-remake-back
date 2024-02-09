-- Revert memorize:util_functions from pg

BEGIN;

DROP FUNCTION create_deck(json);

DROP FUNCTION update_deck(json);

DROP FUNCTION delete_deck(INT);

COMMIT;

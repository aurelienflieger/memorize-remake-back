-- Revert memorize:crud_functions_cards from pg

BEGIN;

DROP FUNCTION create_card(json);

DROP FUNCTION update_card(json);

DROP FUNCTION delete_card(INT);

COMMIT;

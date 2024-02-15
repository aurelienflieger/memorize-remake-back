-- Revert memorize:crud_functions from pg

BEGIN;

DROP FUNCTION create_user(json);

DROP FUNCTION update_user(json);

DROP FUNCTION delete_user(INT);

COMMIT;

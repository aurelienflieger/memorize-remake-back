-- Revert memorize:get-function_user from pg

BEGIN;

DROP FUNCTION get_user(INT);

COMMIT;

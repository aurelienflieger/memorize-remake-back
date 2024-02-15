-- Verify memorize:get-function_user on pg

BEGIN;

SELECT has_function_privilege('get_user(INT)', 'execute');

ROLLBACK;

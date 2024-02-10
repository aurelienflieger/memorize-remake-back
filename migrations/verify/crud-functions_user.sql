-- Verify memorize:crud_functions on pg

BEGIN;

SELECT has_function_privilege('create_user(json)', 'execute');

SELECT has_function_privilege('update_user(json)', 'execute');

SELECT has_function_privilege('delete_user(INT)', 'execute');

ROLLBACK;

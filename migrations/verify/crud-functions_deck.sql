-- Verify memorize:crud-functions_deck on pg
BEGIN;

SELECT has_function_privilege('create_deck(json)', 'execute');

SELECT has_function_privilege('update_deck(json)', 'execute');

SELECT has_function_privilege('delete_deck(INT)', 'execute');

ROLLBACK;

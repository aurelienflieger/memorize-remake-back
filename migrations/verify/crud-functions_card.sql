-- Verify memorize:crud_functions_cards on pg

BEGIN;

SELECT has_function_privilege('create_card(json)', 'execute');

SELECT has_function_privilege('update_card(json)', 'execute');

SELECT has_function_privilege('delete_card(INT)', 'execute');

ROLLBACK;

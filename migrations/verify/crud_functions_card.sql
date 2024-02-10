-- Verify memorize:crud_functions_cards on pg

BEGIN;

SELECT has_function_privilege('create_deck(json)', 'execute');

SELECT has_function_privilege('update_deck(json)', 'execute');

SELECT has_function_privilege('delete_deck(json)', 'execute');

ROLLBACK;

-- Deploy memorize:get-function_user to pg

BEGIN;

CREATE FUNCTION get_user(INT) RETURNS TABLE (
    id INT,
    username TEXT,
    email TEXT
) AS $$ 

    SELECT "id", "username", "email" FROM "user"
    WHERE "id" = $1;

$$ LANGUAGE SQL STRICT;

COMMIT;

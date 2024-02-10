-- Deploy memorize:crud_functions_user to pg

BEGIN;

CREATE FUNCTION create_user(json) RETURNS TABLE (
    id INT,
    username TEXT,
    email TEXT,
    password TEXT
) AS $$ 

    INSERT INTO "user"
    (
        "username",
        "email",
        "password"
    ) VALUES (
        $1->>'username',
        $1->>'email',
        $1->>'password'
    ) RETURNING id, username, email, password

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_user(json) RETURNS TABLE (
    id INT,
    username TEXT,
    email TEXT,
    password TEXT
) AS $$ 

    UPDATE "user" SET
    (
        "username",
        "email",
        "password"
    ) = (
       COALESCE(($1->>'username')::TEXT, "username"),
       COALESCE(($1->>'email')::TEXT, "email"),
       COALESCE(($1->>'password')::TEXT, "password")
    ) 
    WHERE "id" = ($1->>'id')::INT
    RETURNING id, username, email, password

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION delete_user(INT) RETURNS TABLE (
    id INT,
    username TEXT,
    email TEXT,
    password TEXT
) AS $$

	DELETE FROM "user" WHERE "id" = $1
	RETURNING id, username, email, password
	
$$ LANGUAGE SQL STRICT;

COMMIT;

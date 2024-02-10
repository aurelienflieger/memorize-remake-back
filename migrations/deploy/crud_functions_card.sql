-- Deploy memorize:crud_functions_cards to pg

BEGIN;

CREATE FUNCTION create_card(json) RETURNS card AS $$ 

    INSERT INTO "card"
    (
        "front",
        "back",
        "difficulty",
        "deck_id"
    ) VALUES (
        $1->>'front',
        $1->>'back',
        $1->>'difficulty',
        $1->>'deck_id'
    ) RETURNING *

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_user(json) RETURNS user AS $$ 

    UPDATE "user" SET
    (
        "username",
        "email",
        "password"
    ) = (
       COALESCE(($1->>'front')::TEXT, "front"),
       COALESCE(($1->>'back')::TEXT, "baxk"),
       COALESCE(($1->>'difficulty')::TEXT, "difficulty"),
       COALESCE(($1->>'deck_id')::TEXT, "deck_id"),

    ) 
    WHERE "deck_id" = ($1->>'deck_id')::INT
    RETURNING *

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION delete_card(INT) RETURNS user AS $$

	DELETE FROM "card" WHERE "deck_id" = $1
	RETURNING *
	
$$ LANGUAGE SQL STRICT;

COMMIT;

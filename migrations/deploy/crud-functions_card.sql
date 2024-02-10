-- Deploy memorize:crud_functions_cards to pg

BEGIN;

CREATE FUNCTION create_card(json) RETURNS TABLE (
    id INT,
    front TEXT,
    back TEXT,
    difficulty TEXT,
    deck_id INT
) AS $$ 

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
        ($1->>'deck_id')::INT
    ) RETURNING *

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_card(json) RETURNS TABLE (
    id INT,
    front TEXT,
    back TEXT,
    difficulty TEXT,
    deck_id INT
) AS $$ 

    UPDATE "card" SET
    (
        "front",
        "back",
        "difficulty",
        "deck_id"
    ) = (
       COALESCE(($1->>'front')::TEXT, "front"),
       COALESCE(($1->>'back')::TEXT, "back"),
       COALESCE(($1->>'difficulty')::TEXT, "difficulty"),
       COALESCE(($1->>'deck_id')::INT, "deck_id")
    ) 
    WHERE "id" = ($1->>'id')::INT
    RETURNING *

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION delete_card(INT) RETURNS TABLE (
    id INT,
    front TEXT,
    back TEXT,
    difficulty TEXT,
    deck_id INT
) AS $$

	DELETE FROM "card" WHERE "id" = $1
	RETURNING *
	
$$ LANGUAGE SQL STRICT;

COMMIT;
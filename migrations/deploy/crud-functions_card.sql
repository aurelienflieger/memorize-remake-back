-- Deploy memorize:crud_functions_cards to pg

BEGIN;

CREATE FUNCTION create_card(json) RETURNS TABLE (
    id INT,
    front TEXT,
    back TEXT,
    difficulty DIFFICULTY_CHECK,
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
        0,
        ($1->>'deck_id')::INT
    ) 
    RETURNING id, front, back, difficulty, deck_id

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_card(json) RETURNS TABLE (
    id INT,
    front TEXT,
    back TEXT,
    difficulty DIFFICULTY_CHECK,
    deck_id INT,
    updated_at TIMESTAMP
) AS $$ 

    UPDATE "card" SET
    (
        "front",
        "back",
        "difficulty",
        "deck_id",
        "updated_at"
    ) = (
       COALESCE(($1->>'front')::TEXT, "front"),
       COALESCE(($1->>'back')::TEXT, "back"),
       COALESCE(($1->>'difficulty')::DIFFICULTY_CHECK, "difficulty"),
       COALESCE(($1->>'deck_id')::INT, "deck_id"),
       NOW()
    ) 
    WHERE "id" = ($1->>'id')::INT
    RETURNING id, front, back, difficulty, deck_id, updated_at

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION delete_card(INT) RETURNS "card" AS $$

	DELETE FROM "card" WHERE "id" = $1
	RETURNING *
	
$$ LANGUAGE SQL STRICT;

COMMIT;
-- Deploy memorize:util_functions to pg

BEGIN;

CREATE FUNCTION create_deck(json) RETURNS deck AS $$

  INSERT INTO "deck"
  (
    "name",
    "description",
    "user_id"
  ) VALUES (
    $1->>'name',
    $1->>'description',
    ($1->>'user_id')::INT
  ) RETURNING *

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_deck(json) RETURNS deck AS $$

  UPDATE "deck" SET (
    "name",
    "description",
    "user_id",
    "updated_at"
    ) = (
      COALESCE(($1->>'name')::TEXT, "name"),
      COALESCE(($1->>'description')::TEXT, "description"),
      COALESCE(($1->>'user_id')::INT, "user_id"),
      NOW()
    )
  WHERE "id" = ($1->>'id')::INT
  RETURNING *

$$ LANGUAGE SQL;

CREATE FUNCTION delete_deck(INT) RETURNS deck AS $$

	DELETE FROM "deck" WHERE "id" = $1
	RETURNING *
	
$$ LANGUAGE SQL STRICT;

COMMIT;

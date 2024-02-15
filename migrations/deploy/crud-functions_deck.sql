-- Deploy memorize:crud-functions_deck to pg

BEGIN;

CREATE FUNCTION create_deck(json) RETURNS TABLE (
    id INT,
    name TEXT,
    description TEXT,
    user_id INT
) AS $$

  INSERT INTO "deck"
  (
    "name",
    "description",
    "user_id"
  ) VALUES (
    $1->>'name',
    $1->>'description',
    ($1->>'user_id')::INT
  ) RETURNING id, name, description, user_id;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_deck(json) RETURNS TABLE (
    id INT,
    name TEXT,
    description TEXT,
    user_id INT,
    updated_at TIMESTAMP
) AS $$

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
  RETURNING id, name, description, user_id, updated_at

$$ LANGUAGE SQL;

CREATE FUNCTION delete_deck(INT) RETURNS "deck" AS $$

	DELETE FROM "deck" WHERE "id" = $1
	RETURNING *
	
$$ LANGUAGE SQL STRICT;

COMMIT;
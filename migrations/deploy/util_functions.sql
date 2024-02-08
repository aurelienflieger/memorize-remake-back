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
    ($1->>'user_id')::int
  ) RETURNING *

$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_deck(json) RETURNS deck AS $$

  UPDATE "deck" SET
    "name" = $1->>'name',
    "description" = $1->>'description',
    "user_id" = ($1->>'user_id')::int,
    "updated_at" = now()
  WHERE "id" = ($1->>'id')::int
  RETURNING *

$$ LANGUAGE sql STRICT;

COMMIT;

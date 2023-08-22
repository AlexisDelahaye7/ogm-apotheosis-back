-- Verify ogm:initDB on pg

BEGIN;

SELECT "id", "username", "email", "password", "role_id" FROM "user" WHERE false;
SELECT "id", "name", "authorization_level" FROM "role" WHERE false;
SELECT "id", "name" FROM "category" WHERE false;
SELECT "id", "name", "description", "age", "duration", "nb_players", "category_id", "author_id", "is_verified" FROM "scenario" WHERE false;
SELECT "id", "user_id", "scenario_id" FROM "bookmark" WHERE false;
SELECT "id", "user_id", "scenario_id", "rate", "opinion" FROM "review" WHERE false;
SELECT "id", "name", "type", "description", "url", "scenario_id" FROM "ressource" WHERE false;
SELECT "id", "name", "description", "scenario_id", "image_url" FROM "asset" WHERE false;
SELECT "id", "name", "description", "type" FROM "stat" WHERE false;
SELECT "id", "stat_id", "asset_id", "level" FROM "asset_has_stat" WHERE false;
SELECT "id", "name", "description", "scenario_id", "image_url" "class", "lineage" FROM "hero" WHERE false;
SELECT "id", "name", "description", "scenario_id", "image_url", "is_hostile" FROM "pnj" WHERE false;
SELECT "id", "name", "description", "scenario_id", "image_url", "type" FROM "item" WHERE false;

ROLLBACK;

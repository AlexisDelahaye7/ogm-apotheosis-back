-- Revert ogm:initDB from pg

BEGIN;

DROP TABLE "user", "role", "category", "scenario", "bookmark", "review", "ressource", "asset", "stat", "asset_has_stat", "hero", "npc", "item";
-- DROP SEQUENCE IF EXISTS "asset_id_seq";

COMMIT;

-- Deploy ogm:onDeleteCascade to pg

BEGIN;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "asset"
ALTER TABLE "asset"
DROP CONSTRAINT "asset_scenario_id_fkey",
ADD CONSTRAINT "asset_scenario_id_fkey"
FOREIGN KEY ("scenario_id")
REFERENCES "scenario" ("id")
ON DELETE CASCADE;  


-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "bookmark"
ALTER TABLE "bookmark"
DROP CONSTRAINT "bookmark_scenario_id_fkey",
ADD CONSTRAINT "bookmark_scenario_id_fkey" 
FOREIGN KEY ("scenario_id") 
REFERENCES "scenario" ("id") 
ON DELETE CASCADE;

ALTER TABLE "bookmark"
DROP CONSTRAINT "bookmark_user_id_fkey",
ADD CONSTRAINT "bookmark_user_id_fkey"
FOREIGN KEY ("user_id")
REFERENCES "user" ("id")
ON DELETE CASCADE;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "review"
ALTER TABLE "review"
DROP CONSTRAINT "review_scenario_id_fkey",
ADD CONSTRAINT "review_scenario_id_fkey" 
FOREIGN KEY ("scenario_id") 
REFERENCES "scenario" ("id") 
ON DELETE CASCADE;

ALTER TABLE "review"
DROP CONSTRAINT "review_user_id_fkey",
ADD CONSTRAINT "review_user_id_fkey"
FOREIGN KEY ("user_id")
REFERENCES "user" ("id")
ON DELETE CASCADE;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "asset_has_stat"
ALTER TABLE "asset_has_stat"
DROP CONSTRAINT "asset_has_stat_stat_id_fkey",
ADD CONSTRAINT "asset_has_stat_stat_id_fkey"
FOREIGN KEY ("stat_id")
REFERENCES "stat" ("id")
ON DELETE CASCADE;

ALTER TABLE "asset_has_stat"
DROP CONSTRAINT "asset_has_stat_asset_id_fkey",
ADD CONSTRAINT "asset_has_stat_asset_id_fkey"
FOREIGN KEY ("asset_id")
REFERENCES "asset" ("id")
ON DELETE CASCADE;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "hero"
ALTER TABLE "hero"
DROP CONSTRAINT "hero_asset_id_fkey",
ADD CONSTRAINT "hero_asset_id_fkey"
FOREIGN KEY ("asset_id")
REFERENCES "asset" ("id")
ON DELETE CASCADE;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "npc"
ALTER TABLE "npc"
DROP CONSTRAINT "npc_asset_id_fkey",
ADD CONSTRAINT "npc_asset_id_fkey"
FOREIGN KEY ("asset_id")
REFERENCES "asset" ("id")
ON DELETE CASCADE;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "item"
ALTER TABLE "item"
DROP CONSTRAINT "item_asset_id_fkey",
ADD CONSTRAINT "item_asset_id_fkey"
FOREIGN KEY ("asset_id")
REFERENCES "asset" ("id")
ON DELETE CASCADE;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "ressource"
ALTER TABLE "ressource"
DROP CONSTRAINT "ressource_scenario_id_fkey",
ADD CONSTRAINT "ressource_scenario_id_fkey"
FOREIGN KEY ("scenario_id")
REFERENCES "scenario" ("id")
ON DELETE CASCADE;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "stat"
ALTER TABLE "stat"
DROP CONSTRAINT "stat_scenario_id_fkey",
ADD CONSTRAINT "stat_scenario_id_fkey"
FOREIGN KEY ("scenario_id")
REFERENCES "scenario" ("id")
ON DELETE CASCADE;

-- Appliquer ON DELETE CASCADE à la contrainte de clé étrangère dans la table "scenario"
ALTER TABLE "scenario"
DROP CONSTRAINT "scenario_author_id_fkey",
ADD CONSTRAINT "scenario_author_id_fkey"
FOREIGN KEY ("author_id")
REFERENCES "user" ("id")
ON DELETE CASCADE;



COMMIT;

BEGIN;

DROP TABLE IF EXISTS ("user", "role", "category", "scenario", "bookmark", "review", "ressource", "asset", "stat", "asset_has_stat", "hero", "pnj", "item")

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "username" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role_id" INT NOT NULL REFERENCES "role" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "role" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "authorization_level" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "category" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "scenario" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "age" INT,
  "duration" INT,
  "nb_players" INT NOT NULL,
  "category_id" INT NOT NULL REFERENCES "category" ("id"),
  "author_id" INT NOT NULL REFERENCES "user" ("id"),
  "is_verified" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "bookmark" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user" ("id"),
  "scenario_id" INT NOT NULL REFERENCES "scenario" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "review" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user" ("id"),
  "scenario_id" INT NOT NULL REFERENCES "scenario" ("id"),
  "rate" INT NOT NULL,
  "opinion" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "ressource" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "scenario_id" INT NOT NULL REFERENCES "scenario" ("id"),
  "type" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "asset" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "scenario_id" INT NOT NULL REFERENCES "scenario" ("id"),
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "stat" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "asset_has_stat" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "stat_id" INT NOT NULL REFERENCES "stat" ("id"),
  "asset_id" INT NOT NULL REFERENCES "asset" ("id"),
  "level" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "hero" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- "parent_asset_id" INT NOT NULL REFERENCES "asset" ("id"),
  "class" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
) INHERITS ("asset");

CREATE TABLE "pnj" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "is_hostile" BOOLEAN NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
) INHERITS ("asset");

CREATE TABLE "item" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "type" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
) INHERITS ("asset");

COMMIT;
import client from '../config/client.db.js';

export default {

  async findAll() {
    const result = await client.query(`
      SELECT "scenario".*, "category"."name" AS "category_name" FROM "scenario"
      JOIN "category" ON "category"."id" = "scenario"."category_id"
      ORDER BY "scenario"."id" ASC;
    `);
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query(
      `SELECT "scenario".*,
      "category"."name" AS "category_name" FROM "scenario"
      JOIN "category" ON "category"."id" = "scenario"."category_id"
      WHERE "scenario"."id" = $1;`,
      [id],
    );
    return result.rows[0];
  },

  async findByName(name) {
    const result = await client.query(
      'SELECT * FROM "scenario" WHERE name = $1',
      [name],
    );
    return result.rows[0];
  },

  async insert(scenario) {
    const result = await client.query(
      `
      INSERT INTO "scenario" ("name", "description", "age", "duration", "nb_players", "category_id", "author_id", "is_verified")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        scenario.name,
        scenario.description,
        scenario.age,
        scenario.duration,
        scenario.nb_players,
        scenario.category_id,
        scenario.author_id,
        scenario.is_verified,
      ],
    );
    return result.rows[0];
  },

  async update(id, scenario) {
    const values = Object.values(scenario);
    values.unshift(Number(id));
    values.join(', ');

    const keys = Object.keys(scenario);
    const placeholders = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');

    const result = await client.query(
      `
      UPDATE "scenario"
      SET ${placeholders}
      WHERE id = $1
      RETURNING *
      `,
      values,
    );

    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query(
      `
      DELETE FROM "scenario"
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    return result.rows[0];
  },

  async findReviewsByScenarioPk(id) {
    const result = await client.query(
      `
      SELECT "review".*,
      "scenario"."name" AS "scenario_name",
      "user"."username" AS "user_username"
      FROM "review"
      JOIN "scenario" ON "scenario"."id" = "review"."scenario_id"
      JOIN "user" ON "user"."id" = "review"."user_id"
      WHERE "scenario"."id" = $1
      `,
      [id],
    );
    return result.rows;
  },

  async findRessourcesByScenarioPk(id) {
    const result = await client.query(
      `
      SELECT "ressource".*,
      "scenario"."name" AS "scenario_name"
      FROM "ressource"
      JOIN "scenario" ON "scenario"."id" = "ressource"."scenario_id"
      WHERE "scenario"."id" = $1
      `,
      [id],
    );
    return result.rows;
  },

  async findItemsByScenarioPk(id) {
    const result = await client.query(
      `
      SELECT "item".*,
      "asset"."name" AS "asset_name",
      "scenario"."name" AS "scenario_name"
      FROM "item"
      JOIN "asset" ON "asset"."id" = "item"."asset_id"
      JOIN "scenario" ON "scenario"."id" = "asset"."scenario_id"
      WHERE "scenario"."id" = $1
      `,
      [id],
    );
    return result.rows;
  },

  async findHerosByScenarioPk(id) {
    const result = await client.query(
      `
      SELECT "hero".*,
      "asset"."name" AS "asset_name",
      "scenario"."name" AS "scenario_name"
      FROM "hero"
      JOIN "asset" ON "asset"."id" = "hero"."asset_id"
      JOIN "scenario" ON "scenario"."id" = "asset"."scenario_id"
      WHERE "scenario"."id" = $1
      `,
      [id],
    );
    return result.rows;
  },

  async findNpcByScenarioPk(id) {
    const result = await client.query(
      `
      SELECT "npc".*,
      "asset"."name" AS "asset_name",
      "scenario"."name" AS "scenario_name"
      FROM "npc"
      JOIN "asset" ON "asset"."id" = "npc"."asset_id"
      JOIN "scenario" ON "scenario"."id" = "asset"."scenario_id"
      WHERE "scenario"."id" = $1
      `,
      [id],
    );
    return result.rows;
  },
};

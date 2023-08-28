import client from '../config/client.db.js';

export default async function findRoleByUserPk(userId) {
  const result = await client.query(
    `
      SELECT
      "user"."id" AS "id",
      "role"."id" AS "role_id",
      "role"."name" AS "role_name",
      "role"."authorization_level" AS "auth_level"
      FROM "user"
      LEFT JOIN "role" ON "role"."id" = "user"."role_id"
      WHERE "user"."id" = $1;
      `,
    [userId],
  );
  return result.rows[0];
}

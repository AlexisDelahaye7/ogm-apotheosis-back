import { fakerFR as faker } from '@faker-js/faker';
import '../app/helpers/env.load.js';
import pg from 'pg';
import logger from '../app/helpers/logger.js';

/* How many should we generate ? */

const howMany = {
  // ! do not modify the zeros (0) !

  stat: 0,
  hero: 20,
  npc: 20,
  item: 20,
  ressource: 20,
  asset: 0,
  scenario: 11,
  category: 11,
  user: 40,
  role: 3,
  roleAuthor: 0,
  roleUser: 25,
  roleAdmin: 3,
  assetHasStat: 0,

  review: 30,
  bookmark: 30,
};

howMany.stat = (
  howMany.hero
  + howMany.npc
  + howMany.item
);

howMany.asset = howMany.stat;
howMany.assetHasStat = howMany.asset;

howMany.roleAuthor = howMany.scenario;

howMany.role = (
  howMany.roleUser
  + howMany.roleAuthor
  + howMany.roleAdmin
);

/* GENERATE FAKE DATA */

const createRandom = {
  hero: () => {
    const characterClass = faker.helpers.arrayElement(['Barbare', 'Guerrier', 'Mage', 'Paladin', 'Voleur', 'Autre']);
    const lineage = faker.helpers.arrayElement(['Vampire', 'Loup-Garou', 'Zombie', 'Humain', 'Autre']);
    const assetId = faker.number.int({ min: 1, max: howMany.asset });

    return {
      class: characterClass,
      lineage,
      asset_id: assetId,
    };
  },

  heroAsset: () => {
    const name = faker.helpers.arrayElement([
      'Aranthir the Valiant',
      'Eowyn Lightbearer',
      'Lorindel the Brave',
      'Elara Stormblade',
      'Galen Swiftwind',
      'Isolde Silverheart',
      'Thalion the Fearless',
      'Lyanna Firestride',
      'Rowan Starshield',
      'Sylas Moonshadow',
    ]);
    const description = faker.lorem.paragraph();
    const imageUrl = faker.image.avatar();
    const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });

    return {
      name,
      description,
      image_url: imageUrl,
      scenario_id: scenarioId,
    };
  },

  npc: () => {
    const isHostile = faker.helpers.arrayElement([true, false]);
    const assetId = faker.number.int({ min: 1, max: howMany.asset });

    return {
      is_hostile: isHostile,
      asset_id: assetId,
    };
  },

  npcAsset: () => {
    const name = faker.helpers.arrayElement(['Zombie', 'Loup', 'Alien', 'Dragon', 'Vagabond', 'Vampire', 'Orc', 'Pillard', 'Pirate']);
    const description = faker.lorem.paragraph();
    const imageUrl = faker.image.avatar();
    const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });

    return {
      name,
      description,
      image_url: imageUrl,
      scenario_id: scenarioId,
    };
  },

  item: () => {
    const type = faker.helpers.arrayElement(['Arme', 'Armure', 'Bijoux', 'Potion', 'Objets magiques', 'Autre']);
    const assetId = faker.number.int({ min: 1, max: howMany.asset });

    return {
      type,
      asset_id: assetId,
    };
  },

  itemAsset: () => {
    const name = faker.helpers.arrayElement([
      'Excalibur',
      'Elixir of the Ancients',
      'Amulet of Winds',
      'Dragonfire Dagger',
      'Phoenix Feather Wand',
      'Shield of Valor',
      'Scepter of Enchantment',
      'Helm of the Guardian',
      'Orb of Divination',
      'Sword of Destiny',
    ]);
    const description = faker.lorem.paragraph();
    const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });
    const imageUrl = faker.image.avatar();

    return {
      name,
      description,
      image_url: imageUrl,
      scenario_id: scenarioId,
    };
  },

  stat: () => {
    const name = faker.helpers.arrayElement(['Force', 'Endurance', 'Intelligence', 'Dexterite', 'Sagesse', 'Charisme', 'Perception', 'Vigueur', 'Agilité', 'Vitesse', 'Autre']);
    const description = faker.lorem.paragraph();
    const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });

    return {
      name,
      description,
      scenario_id: scenarioId,
    };
  },

  assetHasStat: () => {
    const statId = faker.number.int({ min: 1, max: howMany.stat });
    const assetId = faker.number.int({ min: 1, max: howMany.asset });
    const level = faker.number.int({ min: 1, max: 3 });

    return {
      stat_id: statId,
      asset_id: assetId,
      level,
    };
  },

  ressource: () => {
    const name = faker.helpers.arrayElement(['Carte du maraudeur', 'Livre de règle', 'Ecran du MJ', 'Son des grottes', 'Image de la ville', 'Vidéo de présentation', 'Autre']);
    const description = faker.lorem.paragraph();
    const type = faker.helpers.arrayElement(['Son', 'Image', 'Vidéo', 'Règles', 'Map', 'Illustration', 'Autre']);
    const url = faker.internet.url();
    const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });

    return {
      name,
      description,
      type,
      url,
      scenario_id: scenarioId,
    };
  },

  scenario: () => {
    const categoryId = faker.number.int({ min: 1, max: howMany.category });
    const authorId = faker.number.int({ min: 1, max: howMany.user });
    const name = faker.helpers.arrayElement(['Le donjon de Naheulbeuk', 'L\'appel de Cthulhu', 'D&D', 'L\'oeil noir', 'Shadowrun', 'Vampire', 'Warhammer', 'Star Wars', 'Loup-Garou', 'Polaris', 'Autre']);
    const description = faker.lorem.paragraph();
    const age = faker.helpers.arrayElement([6, 8, 10, 12, 16, 18]);
    const duration = faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const nbPlayers = faker.helpers.arrayElement([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const isVerified = faker.helpers.arrayElement([true, false]);

    return {
      category_id: categoryId,
      author_id: authorId,
      name,
      description,
      age,
      duration,
      nb_players: nbPlayers,
      is_verified: isVerified,
    };
  },

  category: () => {
    const name = faker.helpers.arrayElement(['Médiéval', 'Post-Apocalyptique', 'Sci-Fi', 'Horreur', 'Fantastique', 'Historique', 'Contemporain', 'Western', 'Cyberpunk', 'Super-héros', 'Autre']);
    return { name };
  },

  user: (roleId) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.userName({ firstName, lastName });
    const email = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password();

    return {
      username,
      email,
      password,
      role_id: roleId,
    };
  },

  role: (authLvl) => {
    /**
     * autorization_level
     * guest : 0 (doesn't exists)
     * user : 1
     * author : 2
     * admin : 3
     */

    const authorizationLevel = authLvl;
    let roleName;

    switch (authorizationLevel) {
      case 1:
        roleName = 'user';
        break;
      case 2:
        roleName = 'author';
        break;
      case 3:
        roleName = 'admin';
        break;
      default:
        roleName = 'guest';
        break;
    }

    return {
      name: roleName,
      authorization_level: authorizationLevel,
    };
  },

  review: () => {
    const userId = faker.number.int({ min: 1, max: howMany.user });
    const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });
    const rate = faker.number.int({ min: 1, max: 5 });
    const opinion = faker.lorem.paragraph();

    return {
      user_id: userId,
      scenario_id: scenarioId,
      rate,
      opinion,
    };
  },

  bookmark: () => {
    const userId = faker.number.int({ min: 1, max: howMany.user });
    const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });

    return {
      user_id: userId,
      scenario_id: scenarioId,
    };
  },
};

/* -- Initialize objects of values */

const fakeData = {
  heros: [],
  npcs: [],
  items: [],
  assets: [],
  stats: [],
  ressources: [],
  scenarios: [],
  categories: [],
  users: [],
  roles: [],
  assetsHaveStats: [],
  reviews: [],
  bookmarks: [],
};

/* -- Generate & push data */

logger.debug('Generating fake data...');

// heros
logger.debug(`Generating ${howMany.hero} heros...`);
for (let i = 0; i < howMany.hero; i += 1) {
  fakeData.heros.push(createRandom.hero());
}

// npcs
logger.debug(`Generating ${howMany.npc} npcs...`);
for (let i = 0; i < 10; i += 1) {
  fakeData.npcs.push(createRandom.npc());
}

// items
logger.debug(`Generating ${howMany.item} items...`);
for (let i = 0; i < howMany.item; i += 1) {
  fakeData.items.push(createRandom.item());
}

// assets
logger.debug(`Generating ${howMany.asset} assets...`);
for (let i = 0; i < howMany.hero; i += 1) {
  fakeData.assets.push(createRandom.heroAsset());
}
for (let i = 0; i < howMany.npc; i += 1) {
  fakeData.assets.push(createRandom.npcAsset());
}
for (let i = 0; i < howMany.item; i += 1) {
  fakeData.assets.push(createRandom.itemAsset());
}

// stats
logger.debug(`Generating ${howMany.stat} stats...`);
for (let i = 0; i < howMany.stat; i += 1) {
  fakeData.stats.push(createRandom.stat());
}

// ressources
logger.debug(`Generating ${howMany.ressource} ressources...`);
for (let i = 0; i < howMany.ressource; i += 1) {
  fakeData.ressources.push(createRandom.ressource());
}

// users
logger.debug(`Generating ${howMany.user} users...`);
for (let i = 0; i < howMany.roleAdmin; i += 1) {
  fakeData.users.push(createRandom.user(3));
}
for (let i = 0; i < howMany.roleAuthor; i += 1) {
  fakeData.users.push(createRandom.user(2));
}
for (let i = 0; i < howMany.roleUser; i += 1) {
  fakeData.users.push(createRandom.user(1));
}

// scenarios
logger.debug(`Generating ${howMany.scenario} scenarios...`);
for (let i = 0; i < howMany.scenario; i += 1) {
  fakeData.scenarios.push(createRandom.scenario());
}

// categories
logger.debug(`Generating ${howMany.category} categories...`);
for (let i = 0; i < howMany.category; i += 1) {
  fakeData.categories.push(createRandom.category());
}

// roles
logger.debug(`Generating ${howMany.role} roles...`);
for (let i = 0; i < howMany.role; i += 1) {
  fakeData.roles.push(createRandom.role(i += 1));
}

// assets_have_stats
logger.debug(`Generating ${howMany.stat} assets_have_stats...`);
for (let i = 0; i < howMany.assetHasStat; i += 1) {
  fakeData.assetsHaveStats.push(createRandom.assetHasStat());
}

// reviews
logger.debug(`Generating ${howMany.review} reviews...`);
for (let i = 0; i < howMany.review; i += 1) {
  fakeData.reviews.push(createRandom.review());
}

// bookmarks
logger.debug(`Generating ${howMany.bookmark} bookmarks...`);
for (let i = 0; i < howMany.bookmark; i += 1) {
  fakeData.bookmarks.push(createRandom.bookmark());
}

/* Connexion au client */

logger.debug('Connecting to database client...');

const { Client } = pg;
const client = new Client();
await client.connect();

logger.debug('Cleaning tables...');

await client.query('TRUNCATE TABLE "role", "user", "asset", "scenario", "category", "stat", "ressource", "item", "npc", "hero", "scenario", "asset_has_stat", "review", "bookmark" RESTART IDENTITY');

const queries = {
  role: [],
  user: [],
  category: [],
  scenario: [],

  bookmark: [],
  review: [],

  ressource: [],
  stat: [],
  asset: [],
  assetHasStat: [],

  hero: [],
  npc: [],
  item: [],
};

fakeData.roles.forEach((role) => {
  const query = client.query(
    `
      INSERT INTO "role" (
        "name",
        "authorization_level"
      ) VALUES
        ($1, $2)
        RETURNING *
    `,
    [
      role.name,
      role.authorization_level,
    ],
  );
  queries.role.push(query);
});

fakeData.users.forEach((user) => {
  const query = client.query(
    `
      INSERT INTO "user" (
        "username",
        "email",
        "password",
        "role_id"
      ) VALUES
        ($1, $2, $3,$4)
        RETURNING *
      `,
    [
      user.username,
      user.email,
      user.password,
      user.role_id,
    ],
  );
  queries.user.push(query);
});

fakeData.categories.forEach((category) => {
  const query = client.query(
    `
      INSERT INTO "category" (
        "name"
      ) VALUES
        ($1)
        RETURNING *
    `,
    [
      category.name,
    ],
  );
  queries.category.push(query);
});

fakeData.scenarios.forEach((scenario) => {
  const query = client.query(
    `
      INSERT INTO "scenario" (
        "name",
        "description",
        "age",
        "duration",
        "nb_players",
        "category_id",
        "author_id",
        "is_verified"
      ) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
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
  queries.scenario.push(query);
});

fakeData.bookmarks.forEach((bookmark) => {
  const query = client.query(
    `
      INSERT INTO "bookmark" (
        "user_id",
        "scenario_id"
      ) VALUES
        ($1, $2)
        RETURNING *
    `,
    [
      bookmark.user_id,
      bookmark.scenario_id,
    ],
  );
  queries.bookmark.push(query);
});

fakeData.reviews.forEach((review) => {
  const query = client.query(
    `
      INSERT INTO "review" (
        "user_id",
        "scenario_id",
        "rate",
        "opinion"
      ) VALUES
        ($1, $2, $3, $4)
        RETURNING *
    `,
    [
      review.user_id,
      review.scenario_id,
      review.rate,
      review.opinion,
    ],
  );
  queries.review.push(query);
});

fakeData.ressources.forEach((ressource) => {
  const query = client.query(
    `
      INSERT INTO "ressource" (
        "name",
        "description",
        "type",
        "scenario_id",
        "url"
      ) VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *
    `,
    [
      ressource.name,
      ressource.description,
      ressource.type,
      ressource.scenario_id,
      ressource.url,
    ],
  );
  queries.ressource.push(query);
});

fakeData.stats.forEach((stat) => {
  const query = client.query(
    `
      INSERT INTO "stat" (
        "name",
        "description",
        "scenario_id"
      ) VALUES
        ($1, $2, $3)
        RETURNING *
    `,
    [
      stat.name,
      stat.description,
      stat.scenario_id,
    ],
  );
  queries.stat.push(query);
});

fakeData.assets.forEach((asset) => {
  const query = client.query(
    `
      INSERT INTO "asset" (
        "name",
        "description",
        "image_url",
        "scenario_id"
      ) VALUES
        ($1, $2, $3, $4)
        RETURNING *
    `,
    [
      asset.name,
      asset.description,
      asset.image_url,
      asset.scenario_id,
    ],
  );
  queries.asset.push(query);
});

fakeData.assetsHaveStats.forEach((assetHasStat) => {
  const query = client.query(
    `
      INSERT INTO "asset_has_stat" (
        "stat_id",
        "asset_id",
        "level"
      ) VALUES
        ($1, $2, $3)
        RETURNING *
    `,
    [
      assetHasStat.stat_id,
      assetHasStat.asset_id,
      assetHasStat.level,
    ],
  );
  queries.assetHasStat.push(query);
});

fakeData.heros.forEach((hero) => {
  const query = client.query(
    `
      INSERT INTO "hero" (
        "class",
        "lineage",
        "asset_id"
      ) VALUES
        ($1, $2, $3)
        RETURNING *
    `,
    [
      hero.class,
      hero.lineage,
      hero.asset_id,
    ],
  );
  queries.hero.push(query);
});

fakeData.npcs.forEach((npc) => {
  const query = client.query(
    `
      INSERT INTO "npc" (
        "is_hostile",
        "asset_id"
      ) VALUES
        ($1, $2)
        RETURNING *
    `,
    [
      npc.is_hostile,
      npc.asset_id,
    ],
  );
  queries.npc.push(query);
});

fakeData.items.forEach((item) => {
  const query = client.query(
    `
      INSERT INTO "item" (
        "type",
        "asset_id"
      ) VALUES
        ($1, $2)
        RETURNING *
    `,
    [
      item.type,
      item.asset_id,
    ],
  );
  queries.item.push(query);
});

Promise.all(queries.role);
Promise.all(queries.user);
Promise.all(queries.category);
Promise.all(queries.scenario);
Promise.all(queries.bookmark);
Promise.all(queries.review);
Promise.all(queries.ressource);
Promise.all(queries.stat);
Promise.all(queries.asset);
Promise.all(queries.assetHasStat);
Promise.all(queries.hero);
Promise.all(queries.npc);
Promise.all(queries.item);

logger.debug('Seeding done !');

// TODO

// 1. Créer les fonctions factories pour
// a. Générer de la fausse donnée
// b. Retourner la fausses données sous forme d'objet
// 2. Import de dotenv, pg et logger
// 3. Connexion au client
// 4. Clean les tables avec TRUNCATE et RESTART IDENTITY
// 5. Initialise un tableau de requêtes vide. Il référence l'ensemble des requêtes d'insertion des catégories
// 6. On itère sur l'objet contenant les fausses données
// a. Générer la query d'insertion
// b. Ajouter l'objet qui contient la query et la donnée au tableau de requêtes
// 7. On génère une Promise qui contient l'ensemble des requêtes d'insertion et les valeurs associées qui sont ensuite ajoutées en BDD

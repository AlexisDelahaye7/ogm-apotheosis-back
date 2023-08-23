import { fakerFR as faker } from '@faker-js/faker';
import '../app/helpers/env.load.js';
import pg from 'pg';

/* How many should we generate ? */

const howMany = {
  hero: 20,
  npc: 20,
  item: 20,
  ressource: 0,
  stat: 0,
  scenario: 11,
  category: 11,
  user: 10,
  role: 3,

  assetHasStat: 0,
  review: 30,
  bookmark: 30,
};

howMany.assetHasStat = howMany.stat;
howMany.stat = (
  howMany.hero
  + howMany.npc
  + howMany.item
);

/* GENERATE FAKE DATA */

/* -- ASSETS : HERO, NPC, ITEM */

function createRandomHero() {
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
  const characterClass = faker.helpers.arrayElement(['Barbare', 'Guerrier', 'Mage', 'Paladin', 'Voleur', 'Autre']);
  const lineage = faker.helpers.arrayElement(['Vampire', 'Loup-Garou', 'Zombie', 'Humain', 'Autre']);

  return {
    name,
    description,
    image_url: imageUrl,
    class: characterClass,
    lineage,
    scenario_id: scenarioId,
  };
}

function createRandomNPC() {
  const name = faker.helpers.arrayElement(['Zombie', 'Loup', 'Alien', 'Dragon', 'Vagabond', 'Vampire', 'Orc', 'Pillard', 'Pirate']);
  const description = faker.lorem.paragraph();
  const imageUrl = faker.image.avatar();
  const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });
  const isHostile = faker.helpers.arrayElement([true, false]);

  return {
    name,
    description,
    image_url: imageUrl,
    is_hostile: isHostile,
    scenario_id: scenarioId,
  };
}

function createRandomItem() {
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
  const type = faker.helpers.arrayElement(['Arme', 'Armure', 'Bijoux', 'Potion', 'Objets magiques', 'Autre']);
  const description = faker.lorem.paragraph();
  const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });
  const imageUrl = faker.image.avatar();

  return {
    name,
    type,
    description,
    imageUrl,
    scenario_id: scenarioId,
  };
}

/* -- STAT, ASSET_HAS_STAT */

function createRandomStat() {
  const name = faker.helpers.arrayElement(['Force', 'Endurance', 'Intelligence', 'Dexterite', 'Sagesse', 'Charisme', 'Perception', 'Vigueur', 'Agilité', 'Vitesse', 'Autre']);
  const description = faker.lorem.paragraph();
  const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });

  return {
    name,
    description,
    scenario_id: scenarioId,
  };
}

function createRandomAssetHasStat() {
  const statId = faker.number.int({ min: 1, max: howMany.stat });
  const assetId = faker.number.int({ min: 1, max: howMany.hero + howMany.npc + howMany.item });
  const level = faker.number.int({ min: 1, max: 3 });

  return {
    stat_id: statId,
    asset_id: assetId,
    level,
  };
}

/* -- RESSOURCE, CATEGORY & SCENARIO */

function createRandomRessource() {
  const type = faker.helpers.arrayElement(['Son', 'Image', 'Vidéo', 'Règles', 'Map', 'Illustration', 'Autre']);
  const name = faker.helpers.arrayElement(['Carte du maraudeur', 'Livre de règle', 'Ecran du MJ', 'Son des grottes', 'Image de la ville', 'Vidéo de présentation', 'Autre']);
  const description = faker.lorem.paragraph();
  const url = faker.internet.url();
  const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });

  return {
    type,
    name,
    description,
    url,
    scenario_id: scenarioId,
  };
}

function createRandomScenario() {
  const categoryId = faker.number.int({ min: 1, max: 11 });
  const authorId = faker.number.int({ min: 1, max: 11 });
  const name = faker.helpers.arrayElement(['Le donjon de Naheulbeuk', 'L\'appel de Cthulhu', 'D&D', 'L\'oeil noir', 'Shadowrun', 'Vampire', 'Warhammer', 'Star Wars', 'Loup-Garou', 'Polaris', 'Autre']);
  const description = faker.lorem.paragraph();
  const age = faker.helpers.arrayElement(['Tout public', '16+', '18+']);
  const duration = faker.helpers.arrayElement(['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h']);
  const nbPlayer = faker.helpers.arrayElement(['2', '3', '4', '5', '6', '7', '8', '9', '10']);
  const isVerified = faker.helpers.arrayElement([true, false]);

  return {
    category_id: categoryId,
    author_id: authorId,
    name,
    description,
    age,
    duration,
    nbPlayer,
    isVerified,
  };
}

function createRandomCategory() {
  const name = faker.helpers.arrayElement(['Médiéval', 'Post-Apocalyptique', 'Sci-Fi', 'Horreur', 'Fantastique', 'Historique', 'Contemporain', 'Western', 'Cyberpunk', 'Super-héros', 'Autre']);
  return { name };
}

/* -- USER & ROLE */

function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password();
  const roleId = faker.number.int({ min: 1, max: howMany.role });

  return {
    username,
    email,
    password,
    role_id: roleId,
  };
}

function createRandomRole() {
  /**
   * autorization_level
   * guest : 0 (doesn't exists)
   * user : 1
   * author : 2
   * admin : 3
   */

  const random = faker.number.int({ min: 1, max: howMany.role });
  const authorizationLevel = random;
  let roleName;

  switch (random) {
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
    role_name: roleName,
    authorization_level: authorizationLevel,
  };
}

/* -- REVIEW & USER_SCENARIO_BOOKMARK */

function createRandomReview() {
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
}

function createRandomBookmark() {
  const userId = faker.number.int({ min: 1, max: howMany.user });
  const scenarioId = faker.number.int({ min: 1, max: howMany.scenario });

  return {
    user_id: userId,
    scenario_id: scenarioId,
  };
}

/* Génération */

/* -- Initialize objects of values */

const heros = [];
const npcs = [];
const items = [];
const stats = [];
const ressources = [];
const scenarios = [];
const categories = [];
const users = [];
const roles = [];

const assetsHaveStats = [];
const reviews = [];
const bookmarks = [];

/* -- Generate & push data */

// heros
for (let i = 0; i < howMany.hero; i++) {
  heros.push(createRandomHero());
}

// npcs
for (let i = 0; i < 10; i++) {
  npcs.push(createRandomNPC());
}

// items
for (let i = 0; i < howMany.item; i++) {
  items.push(createRandomItem());
}

// stats
for (let i = 0; i < howMany.stat; i++) {
  stats.push(createRandomStat());
}

// ressources
for (let i = 0; i < howMany.ressource; i++) {
  ressources.push(createRandomRessource());
}

// scenarios
for (let i = 0; i < howMany.scenario; i++) {
  scenarios.push(createRandomScenario());
}

// categories
for (let i = 0; i < howMany.category; i++) {
  categories.push(createRandomCategory());
}

// users
for (let i = 0; i < howMany.user; i++) {
  users.push(createRandomUser());
}

// roles
for (let i = 0; i < howMany.role; i++) {
  roles.push(createRandomRole());
}

// assets_have_stats
for (let i = 0; i < howMany.assetHasStat; i++) {
  assetsHaveStats.push(createRandomAssetHasStat());
}

// reviews
for (let i = 0; i < howMany.review; i++) {
  reviews.push(createRandomReview());
}

// bookmarks
for (let i = 0; i < howMany.bookmark; i++) {
  bookmarks.push(createRandomBookmark());
}

/* Connexion au client */

const { Client } = pg;
const client = new Client();
await client.connect();

await client.query('TRUNCATE TABLE "role", "user", "asset", "scenario", "category", "stat", "ressource", "item", "npc", "hero", "scenario", "asset_has_stat", "review", "bookmark" RESTART IDENTITY');

const userQueries = [];
const roleQueries = [];
const categoryQueries = [];
const scenarioQueries = [];
const statQueries = [];
const assetsQueries = [];
const ressourceQueries = [];
const itemQueries = [];
const characterQueries = [];

users.forEach((user) => {
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

  userQueries.push(query);
});

console.log(userQueries);

const result = await Promise.all(userQueries);
console.log(result);

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

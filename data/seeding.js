import { fakerFR as faker } from '@faker-js/faker';

function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password();
  const roleId = faker.number.int({ min: 1, max: 3 });

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

  const random = Math.floor(Math.random() * 3 + 1);
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

function createRandomCategory() {
  const name = faker.helpers.arrayElement(['Médiéval', 'Post-Apocalyptique', 'Sci-Fi', 'Horreur', 'Fantastique', 'Historique', 'Contemporain', 'Western', 'Cyberpunk', 'Super-héros', 'Autre']);
  return { name };
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
    categoryId,
    authorId,
    name,
    description,
    age,
    duration,
    nbPlayer,
    isVerified,
  };
}

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

import express from 'express';
import userController from '../controllers/user.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfAdmin from '../middlewares/checkIfAdmin.middleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(userController.getOne)

/**
   * 1. On récupère le JWT de l'utilisateur, on le décode et on récupère le payload qui contient l'ID (enregistrer l'id dans la req)
   * 2. On vérifie si l'ID du payload correspond à l'ID d'un admin
   * 3. On vérifie si l'ID du payload correspond à l'ID de l'utilisateur qu'on veut modifier
   * 4. Si 3. ou 4. est vrai, on peut modifier l'utilisateur. (stocker isAdmin ou isOwner dans "req.userToken.payload" ?)
   */

  .patch(getUserToken, /* checkIfAdmin, checkIfOwner, */ userController.updateOne) // jwt 1 owner
  .delete(userController.deleteOne); // jwt 1 owner

router
  .route('/')
  .get(userController.getAll) // jwt 3
  .post(userController.createOne);

export default router;

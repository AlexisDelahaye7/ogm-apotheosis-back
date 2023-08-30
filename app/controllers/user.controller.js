import bcrypt from 'bcrypt';
import userDatamapper from '../models/user.datamapper.js';
import roleDatamapper from '../models/role.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

// TODO : add data validation

export default {
  async getAll(req, res) {
    const users = await userDatamapper.findAll();

    const cleanUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
    }));
    return res.json(cleanUsers);
  },

  async getOne(req, res) {
    const result = await userDatamapper.findByPk(req.params.id);

    if (!result) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    const cleanUser = {
      id: result.id,
      username: result.username,
      email: result.email,
    };
    return res.json(cleanUser);
  },

  async updateOne(req, res) {
    const id = Number(req.params.id);
    const { username, email, password } = req.body;

    // si req.body.email existe déjà en dehors de l'utilisateur courant, on renvoie une erreur
    const userFound = await userDatamapper.findByEmail(email);

    if (userFound && userFound.id !== id) {
      throw new ApiError('Email already exists', { statusCode: 409 });
    }

    // si req.body.username existe déjà en dehors de l'utilisateur courant, on renvoie une erreur
    const userFound2 = await userDatamapper.findByUsername(username);
    if (userFound2 && userFound2.id !== id) {
      throw new ApiError('Username already exists', { statusCode: 409 });
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);
      req.body.password = encryptedPassword;
    }
    req.body.updated_at = new Date();

    const result = await userDatamapper.update(req.params.id, req.body);
    if (!result) {
      throw new ApiError('User not found', { statusCode: 404 });
    }

    const cleanResult = {
      id: result.id,
      username: result.username,
      email: result.email,
      role_id: result.role_id,
    };

    return res.json(cleanResult);
  },

  async deleteOne(req, res) {
    const user = await userDatamapper.delete(req.params.id);
    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    return res.json(true);
  },

  async getAuthLevel(req, res) {
    const userRole = await roleDatamapper.findRoleByUserPk(req.params.id);
    if (!userRole) { throw new ApiError('User not found', { statusCode: 404 }); }
    return res.json(userRole.auth_level);
  },
};

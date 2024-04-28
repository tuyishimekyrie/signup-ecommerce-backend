import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/user.controller';

const router = express.Router();

export default (): express.Router => {
  router.post('/create', createUser);
  router.get('/users', getAllUsers);
  router.get('/:id', getUserById);
  router.patch('/:id', updateUser);
  router.delete('/:id', deleteUser);

  return router;
};

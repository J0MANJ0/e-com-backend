import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/category.controller';
import { protectAdminAuth } from '../middleware/auth.middleware';

const categoryRouter: Router = Router();

categoryRouter.post('/', protectAdminAuth, createCategory);
categoryRouter.put('/:id', protectAdminAuth, updateCategory);
categoryRouter.delete('/:id', protectAdminAuth, deleteCategory);
categoryRouter.get('/', getCategories);

export default categoryRouter;

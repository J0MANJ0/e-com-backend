import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/category.controller';

const categoryRouter: Router = Router();

categoryRouter.post('/', createCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);
categoryRouter.get('/', getCategories);

export default categoryRouter;

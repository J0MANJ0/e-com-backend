import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/product.controller';
import { protectAdminAuth } from '../middleware/auth.middleware';

const productRouter: Router = Router();

productRouter.post('/', protectAdminAuth, createProduct);
productRouter.put('/:id', protectAdminAuth, updateProduct);
productRouter.delete('/:id', protectAdminAuth, deleteProduct);
productRouter.get('/:id', getProduct);
productRouter.get('/', getProducts);

export default productRouter;

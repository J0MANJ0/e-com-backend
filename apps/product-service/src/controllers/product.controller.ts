import { Request, Response } from 'express';
import { prisma, Prisma } from '@repo/product-db';

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;

  const { images, colors } = data;

  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Colors array is required.',
    });
  }

  if (!images || typeof images !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Images object is required.',
    });
  }

  const missingColors = colors.filter((color) => !(color in images));

  if (missingColors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Missing images for colors',
      missingColors,
    });
  }
  const product = await prisma.product.create({ data });

  return res.status(201).json({ success: true, product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  const data: Prisma.ProductUpdateInput = req.body;
  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  return res.json({
    success: true,
    updatedProduct,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  const product = await prisma.product.delete({
    where: { id: Number(id) },
  });

  return res.json({
    success: true,
    product,
  });
};

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  const orderBy = (() => {
    switch (sort) {
      case 'asc':
        return { price: Prisma.SortOrder.asc };
      case 'desc':
        return { price: Prisma.SortOrder.asc };
      case 'oldest':
        return { createdAt: Prisma.SortOrder.asc };
      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  })();
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: 'insensitive',
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });

  return res.json({
    success: true,
    products,
  });
};

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  return res.json({
    success: true,
    product,
  });
};

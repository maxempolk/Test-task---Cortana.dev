'use server'
import { prisma } from "@/db";
import { Product } from "@/types/products";

export async function getProducts(
  { page = 1, perPage = 12 }: { page?: number; perPage?: number } = {}
): Promise<Product[]> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePerPage = Number.isFinite(perPage) && perPage > 0 ? Math.floor(perPage) : 12;

  const products = await prisma.product.findMany({
    select: {
      id: true,
      image_url: true,
      name: true,
      description: true,
      price: true,
    },
    orderBy: { createdAt: "desc" },
    skip: (safePage - 1) * safePerPage,
    take: safePerPage,
  });

  return products;
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      image_url: true,
      name: true,
      description: true,
      price: true,
    },
  });
  return product;
}

export async function getProductsTotalCount(): Promise<number> {
  return prisma.product.count();
}
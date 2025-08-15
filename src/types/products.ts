interface Product {
  id: string;
  image_url: string | null;
  name: string;
  description: string;
  price: number;
}

export type { Product };
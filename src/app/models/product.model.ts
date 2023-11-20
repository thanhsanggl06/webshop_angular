export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  url: string;
  description: string;
  imageUrl: string;
}

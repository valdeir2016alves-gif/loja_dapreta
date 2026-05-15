import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from '../types/product';
import { initialProducts } from '../data/initialData';

interface ProductState {
  products: Product[];
  categories: string[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  addCategory: (category: string) => void;
  updateCategory: (oldCategory: string, newCategory: string) => void;
  deleteCategory: (category: string) => void;
}

const defaultCategories = [
  "Maquiagem",
  "Skincare",
  "Perfumes",
  "Cabelos",
  "Corpo e Banho",
  "Kits Promocionais"
];

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      categories: defaultCategories,
      addProduct: (product) => 
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },
      addCategory: (category) =>
        set((state) => ({
          categories: state.categories.includes(category) 
            ? state.categories 
            : [...state.categories, category]
        })),
      updateCategory: (oldCategory, newCategory) =>
        set((state) => ({
          categories: state.categories.map(c => c === oldCategory ? newCategory : c),
          products: state.products.map(p => 
            p.category === oldCategory ? { ...p, category: newCategory } : p
          )
        })),
      deleteCategory: (category) =>
        set((state) => ({
          categories: state.categories.filter(c => c !== category),
          products: state.products.map(p => 
            p.category === category ? { ...p, category: "Sem Categoria" } : p
          )
        })),
    }),
    {
      name: 'bella-glow-products',
    }
  )
);

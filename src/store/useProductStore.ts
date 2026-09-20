import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Product } from '@/types/product';
import { initialProducts } from '@/data/initialData';

const defaultCategories = [
  "Maquiagem",
  "Skincare",
  "Perfumes",
  "Cabelos",
  "Corpo e Banho",
  "Kits Promocionais"
];

const STORAGE_KEY = 'bella-glow-products';

function loadInitialData(): { products: Product[]; categories: string[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state) {
        return {
          products: parsed.state.products || initialProducts,
          categories: parsed.state.categories || defaultCategories,
        };
      } else if (parsed?.products) {
        return {
          products: parsed.products,
          categories: parsed.categories || defaultCategories,
        };
      }
    }
  } catch (err) {
    console.error('Erro ao ler localStorage de produtos:', err);
  }
  return { products: initialProducts, categories: defaultCategories };
}

export const useProductStore = defineStore('product', () => {
  const initial = loadInitialData();
  const products = ref<Product[]>(initial.products);
  const categories = ref<string[]>(initial.categories);

  function persist() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          state: {
            products: products.value,
            categories: categories.value,
          },
          version: 0,
        })
      );
    } catch (err) {
      console.error('Erro ao salvar produtos no localStorage:', err);
    }
  }

  watch([products, categories], persist, { deep: true });

  function addProduct(product: Product) {
    products.value.push(product);
  }

  function updateProduct(id: string, updatedProduct: Product) {
    const idx = products.value.findIndex((p) => p.id === id);
    if (idx !== -1) {
      products.value[idx] = updatedProduct;
    }
  }

  function deleteProduct(id: string) {
    products.value = products.value.filter((p) => p.id !== id);
  }

  function getProductById(id: string): Product | undefined {
    return products.value.find((p) => p.id === id);
  }

  function addCategory(category: string) {
    if (!categories.value.includes(category)) {
      categories.value.push(category);
    }
  }

  function updateCategory(oldCategory: string, newCategory: string) {
    const idx = categories.value.indexOf(oldCategory);
    if (idx !== -1) {
      categories.value[idx] = newCategory;
    }
    products.value.forEach((p) => {
      if (p.category === oldCategory) {
        p.category = newCategory;
      }
    });
  }

  function deleteCategory(category: string) {
    categories.value = categories.value.filter((c) => c !== category);
    products.value.forEach((p) => {
      if (p.category === category) {
        p.category = "Sem Categoria";
      }
    });
  }

  return {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    addCategory,
    updateCategory,
    deleteCategory,
  };
});

import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Product } from '@/types/product';
import { initialProducts } from '@/data/initialData';

const defaultCategories = [
  "Revistas Avon",
  "Maquiagem",
  "Skincare",
  "Perfumes",
  "Cabelos",
  "Corpo e Banho",
  "Kits Promocionais",
  "Casa",
];

const STORAGE_KEY = 'bella-glow-products';

function prioritizeRevistas(list: Product[]): Product[] {
  const revistas = list.filter((p) => p.name.toLowerCase().includes('revista'));
  const others = list.filter((p) => !p.name.toLowerCase().includes('revista'));
  return [...revistas, ...others];
}

function loadInitialData(): { products: Product[]; categories: string[]; deletedIds: string[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const savedProducts: Product[] = parsed?.state?.products || parsed?.products || [];
      const savedCategories: string[] = parsed?.state?.categories || parsed?.categories || [];
      const savedDeletedIds: string[] = parsed?.state?.deletedIds || parsed?.deletedIds || [];

      let finalProducts = initialProducts;
      if (savedProducts.length > 0) {
        const initialMap = new Map(initialProducts.map((p) => [p.id, p]));
        const updatedSaved = savedProducts.map((p) => {
          const init = initialMap.get(p.id);
          if (init) {
            // CRÍTICO: os valores salvos pelo usuário (p) PRECISAM sobrepor os valores iniciais (init)!
            return {
              ...init,
              ...p,
              // Preenche links de catálogo/PDF padrão caso não tenham sido preenchidos
              catalogUrl: p.catalogUrl ?? init.catalogUrl,
              pdfUrl: p.pdfUrl ?? init.pdfUrl,
            };
          }
          return p;
        });

        const savedIds = new Set(savedProducts.map((p) => p.id));
        const deletedIdsSet = new Set(savedDeletedIds);
        // Não readiciona produtos que foram intencionalmente excluídos pelo usuário
        const missingInitial = initialProducts.filter(
          (p) => !savedIds.has(p.id) && !deletedIdsSet.has(p.id)
        );
        finalProducts = [...updatedSaved, ...missingInitial];
      }

      const finalCategories = Array.from(new Set([...defaultCategories, ...savedCategories]));

      return {
        products: prioritizeRevistas(finalProducts),
        categories: finalCategories,
        deletedIds: savedDeletedIds,
      };
    }
  } catch (err) {
    console.error('Erro ao ler localStorage de produtos:', err);
  }
  return { products: prioritizeRevistas(initialProducts), categories: defaultCategories, deletedIds: [] };
}

export const useProductStore = defineStore('product', () => {
  const initial = loadInitialData();
  const products = ref<Product[]>(initial.products);
  const categories = ref<string[]>(initial.categories);
  const deletedIds = ref<string[]>(initial.deletedIds);

  function persist(): boolean {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          state: {
            products: products.value,
            categories: categories.value,
            deletedIds: deletedIds.value,
          },
          version: 1,
        })
      );
      return true;
    } catch (err) {
      console.error('Erro ao salvar produtos no localStorage:', err);
      alert('Atenção: Não foi possível salvar no armazenamento do navegador. A memória pode estar cheia devido a fotos muito pesadas.');
      return false;
    }
  }

  watch([products, categories, deletedIds], persist, { deep: true });

  function addProduct(product: Product) {
    deletedIds.value = deletedIds.value.filter((id) => id !== product.id);
    products.value.push(product);
    persist();
  }

  function updateProduct(id: string, updatedProduct: Product) {
    const idx = products.value.findIndex((p) => p.id === id);
    if (idx !== -1) {
      products.value[idx] = updatedProduct;
      persist();
    }
  }

  function deleteProduct(id: string) {
    if (!deletedIds.value.includes(id)) {
      deletedIds.value.push(id);
    }
    products.value = products.value.filter((p) => p.id !== id);
    persist();
  }

  function getProductById(id: string): Product | undefined {
    return products.value.find((p) => p.id === id);
  }

  function addCategory(category: string) {
    if (!categories.value.includes(category)) {
      categories.value.push(category);
      persist();
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
    persist();
  }

  function deleteCategory(category: string) {
    categories.value = categories.value.filter((c) => c !== category);
    products.value.forEach((p) => {
      if (p.category === category) {
        p.category = "Sem Categoria";
      }
    });
    persist();
  }

  function resetToDefault() {
    products.value = prioritizeRevistas(initialProducts);
    categories.value = [...defaultCategories];
    deletedIds.value = [];
    persist();
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
    resetToDefault,
    persist,
  };
});

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '@/types/product';
import { initialProducts } from '@/data/initialData';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
  getDocs,
} from 'firebase/firestore';

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
const CURRENT_VERSION = 2;

function prioritizeRevistas(list: Product[]): Product[] {
  const revistas = list.filter((p) => p.name.toLowerCase().includes('revista'));
  const others = list.filter((p) => !p.name.toLowerCase().includes('revista'));
  return [...revistas, ...others];
}

function cleanForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      clean[key] = value;
    }
  }
  return clean;
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
            return {
              ...init,
              ...p,
              catalogUrl: p.catalogUrl ?? init.catalogUrl,
              pdfUrl: p.pdfUrl ?? init.pdfUrl,
            };
          }
          return p;
        });

        const savedIds = new Set(savedProducts.map((p) => p.id));
        const deletedIdsSet = new Set(savedDeletedIds);
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
  const isCloudConnected = ref<boolean>(false);
  const cloudError = ref<string | null>(null);

  function persistLocal(): boolean {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          state: {
            products: products.value,
            categories: categories.value,
            deletedIds: deletedIds.value,
          },
          version: CURRENT_VERSION,
        })
      );
      return true;
    } catch (err) {
      console.error('Erro ao salvar produtos no localStorage:', err);
      return false;
    }
  }

  // --- SINCRONIZAÇÃO EM TEMPO REAL COM FIREBASE FIRESTORE ---
  try {
    const productsCol = collection(db, 'products');

    onSnapshot(
      productsCol,
      async (snapshot) => {
        isCloudConnected.value = true;
        cloudError.value = null;

        // Se o banco na nuvem ainda estiver vazio, inicializa com o catálogo inicial
        if (snapshot.empty) {
          console.log('Firebase vazio. Enviando catálogo padrão para a nuvem...');
          try {
            const batch = writeBatch(db);
            for (const prod of products.value) {
              const docRef = doc(db, 'products', prod.id);
              batch.set(docRef, cleanForFirestore(prod));
            }
            await batch.commit();
            console.log('Catálogo inicial salvo no Firebase com sucesso!');
          } catch (e: any) {
            console.error('Erro ao popular catálogo inicial no Firebase:', e);
            cloudError.value = e?.message || 'Erro ao sincronizar inicial';
          }
        } else {
          // Carrega produtos da nuvem em tempo real
          const remoteProducts: Product[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as Product;
            remoteProducts.push({
              ...data,
              id: docSnap.id,
            });
          });
          products.value = prioritizeRevistas(remoteProducts);
          persistLocal();
        }
      },
      (error) => {
        console.error('Erro no listener do Firebase Firestore:', error);
        cloudError.value = error.message;
      }
    );

    // Listener para categorias
    const catDocRef = doc(db, 'config', 'categories');
    onSnapshot(
      catDocRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (Array.isArray(data?.list) && data.list.length > 0) {
            categories.value = data.list;
            persistLocal();
          }
        } else {
          try {
            await setDoc(catDocRef, { list: defaultCategories });
          } catch (e) {
            console.error('Erro ao salvar categorias iniciais no Firebase:', e);
          }
        }
      },
      (error) => {
        console.error('Erro no listener de categorias do Firebase:', error);
      }
    );
  } catch (err: any) {
    console.error('Erro ao inicializar Firebase Firestore:', err);
    cloudError.value = err?.message || 'Falha ao conectar ao Firebase';
  }

  // --- AÇÕES DO CATÁLOGO COM SINCRONIZAÇÃO EM NUVEM ---

  async function addProduct(product: Product) {
    deletedIds.value = deletedIds.value.filter((id) => id !== product.id);
    const existingIndex = products.value.findIndex((p) => p.id === product.id);
    if (existingIndex !== -1) {
      products.value[existingIndex] = product;
    } else {
      products.value.push(product);
    }
    persistLocal();

    try {
      await setDoc(doc(db, 'products', product.id), cleanForFirestore(product));
      return true;
    } catch (err) {
      console.error('Erro ao enviar produto para o Firebase:', err);
      return false;
    }
  }

  async function updateProduct(id: string, updatedProduct: Product) {
    const idx = products.value.findIndex((p) => p.id === id);
    if (idx !== -1) {
      products.value[idx] = updatedProduct;
      persistLocal();
    }

    try {
      await setDoc(doc(db, 'products', id), cleanForFirestore(updatedProduct));
      return true;
    } catch (err) {
      console.error('Erro ao atualizar produto no Firebase:', err);
      return false;
    }
  }

  async function deleteProduct(id: string) {
    if (!deletedIds.value.includes(id)) {
      deletedIds.value.push(id);
    }
    products.value = products.value.filter((p) => p.id !== id);
    persistLocal();

    try {
      await deleteDoc(doc(db, 'products', id));
      return true;
    } catch (err) {
      console.error('Erro ao excluir produto no Firebase:', err);
      return false;
    }
  }

  function getProductById(id: string): Product | undefined {
    return products.value.find((p) => p.id === id);
  }

  async function addCategory(category: string) {
    if (!categories.value.includes(category)) {
      categories.value.push(category);
      persistLocal();
      try {
        await setDoc(doc(db, 'config', 'categories'), { list: categories.value });
      } catch (err) {
        console.error('Erro ao adicionar categoria no Firebase:', err);
      }
    }
  }

  async function updateCategory(oldCategory: string, newCategory: string) {
    const idx = categories.value.indexOf(oldCategory);
    if (idx !== -1) {
      categories.value[idx] = newCategory;
    }
    products.value.forEach((p) => {
      if (p.category === oldCategory) {
        p.category = newCategory;
        updateProduct(p.id, p);
      }
    });
    persistLocal();
    try {
      await setDoc(doc(db, 'config', 'categories'), { list: categories.value });
    } catch (err) {
      console.error('Erro ao atualizar categoria no Firebase:', err);
    }
  }

  async function deleteCategory(category: string) {
    categories.value = categories.value.filter((c) => c !== category);
    products.value.forEach((p) => {
      if (p.category === category) {
        p.category = "Sem Categoria";
        updateProduct(p.id, p);
      }
    });
    persistLocal();
    try {
      await setDoc(doc(db, 'config', 'categories'), { list: categories.value });
    } catch (err) {
      console.error('Erro ao remover categoria no Firebase:', err);
    }
  }

  async function resetToDefault() {
    products.value = prioritizeRevistas(initialProducts);
    categories.value = [...defaultCategories];
    deletedIds.value = [];
    persistLocal();

    try {
      // Limpa coleção existente e insere inicial
      const currentDocs = await getDocs(collection(db, 'products'));
      const batch = writeBatch(db);
      currentDocs.forEach((d) => batch.delete(d.ref));
      for (const prod of initialProducts) {
        batch.set(doc(db, 'products', prod.id), cleanForFirestore(prod));
      }
      batch.set(doc(db, 'config', 'categories'), { list: defaultCategories });
      await batch.commit();
      console.log('Firebase resetado com sucesso!');
    } catch (err) {
      console.error('Erro ao resetar Firebase:', err);
    }
  }

  async function syncAllToCloud() {
    try {
      const batch = writeBatch(db);
      for (const prod of products.value) {
        batch.set(doc(db, 'products', prod.id), cleanForFirestore(prod));
      }
      batch.set(doc(db, 'config', 'categories'), { list: categories.value });
      await batch.commit();
      return true;
    } catch (err) {
      console.error('Erro ao sincronizar tudo para a nuvem:', err);
      return false;
    }
  }

  return {
    products,
    categories,
    isCloudConnected,
    cloudError,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    addCategory,
    updateCategory,
    deleteCategory,
    resetToDefault,
    syncAllToCloud,
    persist: persistLocal,
  };
});

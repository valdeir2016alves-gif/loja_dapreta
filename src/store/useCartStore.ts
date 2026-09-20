import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

const STORAGE_KEY = 'bella-glow-cart';

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.items) {
        return parsed.state.items;
      } else if (Array.isArray(parsed?.items)) {
        return parsed.items;
      } else if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Erro ao ler carrinho do localStorage:', err);
  }
  return [];
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadInitialCart());
  const isCartOpen = ref(false);

  function persist() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          state: {
            items: items.value,
          },
          version: 0,
        })
      );
    } catch (err) {
      console.error('Erro ao salvar carrinho no localStorage:', err);
    }
  }

  watch(items, persist, { deep: true });

  const totalItems = computed(() =>
    items.value.reduce((acc, item) => acc + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
  );

  function addItem(product: Product) {
    const existing = items.value.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.value.push({ product, quantity: 1 });
    }
    isCartOpen.value = true;
  }

  function removeItem(productId: string) {
    items.value = items.value.filter((i) => i.product.id !== productId);
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find((i) => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  function clearCart() {
    items.value = [];
  }

  function openCart() {
    isCartOpen.value = true;
  }

  function closeCart() {
    isCartOpen.value = false;
  }

  return {
    items,
    isCartOpen,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };
});

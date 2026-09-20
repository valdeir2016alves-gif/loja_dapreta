<script setup lang="ts">
import { computed } from 'vue';
import { ShoppingBag, Plus, Minus, Trash2, X } from 'lucide-vue-next';
import { useCartStore } from '@/store/useCartStore';
import { formatImageUrl } from '@/lib/utils';

const cartStore = useCartStore();

const items = computed(() => cartStore.items);
const isCartOpen = computed(() => cartStore.isCartOpen);
const totalItems = computed(() => cartStore.totalItems);
const totalPrice = computed(() => cartStore.totalPrice);

const whatsappUrl = computed(() => {
  const itemsText = items.value
    .map(
      (item) =>
        `- ${item.quantity}x ${item.product.name} (R$ ${item.product.price.toFixed(2)})`
    )
    .join('\n');
  const message = encodeURIComponent(
    `Olá Loja da Preta! Gostaria de finalizar o meu pedido:\n\n${itemsText}\n\n*Total: R$ ${totalPrice.value.toFixed(2)}*`
  );
  return `https://wa.me/5555999911746?text=${message}`;
});

function handleClose() {
  cartStore.closeCart();
}

function handleOpen() {
  cartStore.openCart();
}

function handleRemove(id: string) {
  cartStore.removeItem(id);
}

function handleQuantity(id: string, qty: number) {
  cartStore.updateQuantity(id, Math.max(1, qty));
}

function handleClear() {
  if (confirm('Deseja realmente esvaziar o carrinho?')) {
    cartStore.clearCart();
  }
}
</script>

<template>
  <!-- Floating Button -->
  <div class="fixed bottom-6 right-6 z-40">
    <button
      type="button"
      @click="handleOpen"
      class="relative h-16 w-16 rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 hover:scale-105 transition-all duration-300 flex items-center justify-center"
      title="Abrir carrinho"
    >
      <ShoppingBag class="h-7 w-7" />
      <span
        v-if="totalItems > 0"
        class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[12px] font-bold h-6 w-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
      >
        {{ totalItems }}
      </span>
    </button>
  </div>

  <!-- Cart Modal / Dialog -->
  <div
    v-if="isCartOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    @click.self="handleClose"
  >
    <div
      class="max-w-md w-full max-h-[90vh] flex flex-col bg-white rounded-3xl p-6 gap-0 shadow-2xl relative animate-in zoom-in-95 duration-200"
    >
      <!-- Header -->
      <div class="pb-4 border-b flex items-center justify-between">
        <h3 class="text-2xl font-bold text-primary flex items-center gap-2">
          <ShoppingBag class="h-6 w-6" /> Seu Carrinho
        </h3>
        <button
          type="button"
          @click="handleClose"
          class="p-2 rounded-xl text-muted-foreground hover:bg-secondary/40 transition-colors"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Items List -->
      <div class="flex-grow overflow-y-auto py-4 space-y-4 pr-1">
        <div v-if="items.length === 0" class="text-center py-10">
          <ShoppingBag class="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p class="text-muted-foreground font-medium">Seu carrinho está vazio.</p>
          <button
            type="button"
            @click="handleClose"
            class="mt-4 px-6 py-2.5 border border-primary text-primary hover:bg-primary/5 rounded-xl font-medium text-sm transition-colors"
          >
            Continuar Comprando
          </button>
        </div>

        <div
          v-for="item in items"
          :key="item.product.id"
          class="flex gap-4 p-3 bg-secondary/20 rounded-2xl"
        >
          <div class="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-border">
            <img
              :src="formatImageUrl(item.product.image)"
              :alt="item.product.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col justify-between flex-grow">
            <div>
              <h4 class="font-bold text-sm text-primary line-clamp-1">{{ item.product.name }}</h4>
              <p class="text-primary font-bold">
                R$ {{ item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
              </p>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center bg-white rounded-lg border border-primary/20">
                <button
                  type="button"
                  class="h-7 w-7 text-primary hover:bg-primary/10 rounded-l-lg flex items-center justify-center transition-colors"
                  @click="handleQuantity(item.product.id, item.quantity - 1)"
                >
                  <Minus class="h-3 w-3" />
                </button>
                <span class="w-8 text-center text-sm font-bold">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="h-7 w-7 text-primary hover:bg-primary/10 rounded-r-lg flex items-center justify-center transition-colors"
                  @click="handleQuantity(item.product.id, item.quantity + 1)"
                >
                  <Plus class="h-3 w-3" />
                </button>
              </div>
              <button
                type="button"
                class="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg flex items-center justify-center transition-colors"
                @click="handleRemove(item.product.id)"
                title="Remover produto"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer / Checkout -->
      <div v-if="items.length > 0" class="pt-4 border-t mt-auto">
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-bold text-muted-foreground">Total:</span>
          <span class="text-2xl font-bold text-primary">
            R$ {{ totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
          </span>
        </div>
        <div class="flex flex-col gap-3">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl shadow-lg shadow-green-600/20 flex items-center justify-center transition-colors"
          >
            Finalizar no WhatsApp
          </a>
          <button
            type="button"
            @click="handleClear"
            class="w-full h-12 text-destructive border border-destructive hover:bg-destructive/10 rounded-xl font-medium transition-colors"
          >
            Esvaziar Carrinho
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

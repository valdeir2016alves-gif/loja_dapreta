<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ShoppingCart } from 'lucide-vue-next';
import type { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const cartStore = useCartStore();
const isLoaded = ref(false);

function handleAddToCart(e: Event) {
  e.stopPropagation();
  e.preventDefault();
  cartStore.addItem(props.product);
}

function handleViewDetails() {
  router.push(`/product/${props.product.id}`);
}
</script>

<template>
  <div
    class="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 group rounded-2xl bg-white flex flex-col justify-between cursor-pointer"
    @click="handleViewDetails"
  >
    <div>
      <!-- Image container -->
      <div class="relative aspect-square overflow-hidden bg-secondary/20">
        <img
          :src="product.image"
          :alt="product.name"
          @load="isLoaded = true"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          :class="isLoaded ? 'opacity-100' : 'opacity-0'"
        />

        <div
          v-if="!isLoaded"
          class="absolute inset-0 flex items-center justify-center bg-secondary/10 animate-pulse"
        >
          <span class="text-xs text-muted-foreground">Carregando...</span>
        </div>

        <span
          class="absolute top-3 left-3 bg-white/90 text-primary text-[10px] uppercase font-bold py-0.5 px-2 rounded-md shadow-sm"
        >
          {{ product.category }}
        </span>
      </div>

      <!-- Info -->
      <div class="p-4">
        <h3 class="font-bold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {{ product.name }}
        </h3>
        <p class="text-muted-foreground text-xs line-clamp-2 mb-3 h-8">
          {{ product.shortDescription }}
        </p>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold text-primary">
            R$ {{ product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="p-4 pt-0 flex gap-2">
      <button
        type="button"
        @click.stop="handleViewDetails"
        class="flex-1 py-2 px-3 text-xs font-semibold rounded-xl border border-primary/20 text-primary hover:bg-primary/10 transition-colors text-center"
      >
        Ver detalhes
      </button>
      <button
        type="button"
        @click="handleAddToCart"
        class="bg-primary text-white hover:bg-primary/90 h-9 w-9 flex items-center justify-center rounded-xl shadow-sm transition-colors"
        title="Adicionar ao carrinho"
      >
        <ShoppingCart class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

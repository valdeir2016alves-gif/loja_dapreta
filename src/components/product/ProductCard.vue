<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ShoppingCart, MessageCircle } from 'lucide-vue-next';
import type { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';
import { formatImageUrl } from '@/lib/utils';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const cartStore = useCartStore();
const isLoaded = ref(false);

const isRevista = computed(() => props.product.name.toLowerCase().includes('revista'));

const whatsappUrl = computed(() => {
  if (isRevista.value || props.product.price === 0) {
    const msg = encodeURIComponent(
      `Olá Loja da Preta! Gostaria de consultar ou fazer um pedido através da ${props.product.name}.`
    );
    return `https://wa.me/5555999911746?text=${msg}`;
  }
  const priceFormatted = props.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const msg = encodeURIComponent(
    `Olá Loja da Preta! Gostaria de pedir o produto: ${props.product.name} (R$ ${priceFormatted}).`
  );
  return `https://wa.me/5555999911746?text=${msg}`;
});

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
    class="overflow-hidden border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl bg-white flex flex-col justify-between cursor-pointer group active:scale-[0.99]"
    @click="handleViewDetails"
  >
    <div>
      <!-- Foto do Produto -->
      <div class="relative aspect-square overflow-hidden bg-secondary/15">
        <img
          :src="formatImageUrl(product.image)"
          :alt="product.name"
          @load="isLoaded = true"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          :class="isLoaded ? 'opacity-100' : 'opacity-0'"
        />

        <div
          v-if="!isLoaded"
          class="absolute inset-0 flex items-center justify-center bg-secondary/10 animate-pulse"
        >
          <span class="text-xs text-muted-foreground font-medium">Carregando foto...</span>
        </div>

        <!-- Categoria e Destaque -->
        <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start">
          <span
            v-if="isRevista"
            class="bg-rose-600 text-white text-[11px] sm:text-xs uppercase font-extrabold py-1 px-2.5 rounded-lg shadow-md tracking-wider flex items-center gap-1"
          >
            ⭐ Destaque Revista
          </span>
          <span
            class="bg-white/95 text-primary text-xs uppercase font-extrabold py-1 px-2.5 rounded-lg shadow-sm border border-primary/10 tracking-wider"
          >
            {{ product.category }}
          </span>
        </div>
      </div>

      <!-- Informações -->
      <div class="p-4 sm:p-5">
        <h3 class="font-bold text-lg text-gray-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {{ product.name }}
        </h3>
        <p class="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed">
          {{ product.shortDescription }}
        </p>
        <div class="flex items-baseline justify-between pt-1">
          <span v-if="product.price > 0" class="text-2xl sm:text-3xl font-black text-primary tracking-tight">
            R$ {{ product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
          </span>
          <div v-else class="flex flex-col">
            <span class="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider">Sob Encomenda</span>
            <span class="text-xl sm:text-2xl font-black text-rose-600 tracking-tight">
              Catálogo Virtual
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Botões de Ação Grandes e Confortáveis -->
    <div class="p-4 sm:p-5 pt-0 flex flex-col gap-2">
      <div class="flex gap-2">
        <button
          type="button"
          @click.stop="handleViewDetails"
          class="flex-1 h-12 px-3 text-sm font-bold rounded-2xl border-2 border-primary/20 text-primary hover:bg-primary/10 transition-colors text-center flex items-center justify-center"
        >
          {{ isRevista ? 'Ver Revista' : 'Ver Detalhes' }}
        </button>

        <button
          type="button"
          @click="handleAddToCart"
          class="bg-primary text-white hover:bg-primary/90 h-12 w-12 flex items-center justify-center rounded-2xl shadow-sm transition-transform active:scale-95 flex-shrink-0"
          :title="isRevista ? 'Adicionar ao carrinho para encomendar' : 'Colocar no carrinho'"
        >
          <ShoppingCart class="h-5 w-5" />
        </button>
      </div>

      <!-- Botão Rápido de WhatsApp no Card -->
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        @click.stop
        class="w-full h-11 rounded-2xl bg-green-50 hover:bg-green-100 text-green-700 border border-green-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
      >
        <MessageCircle class="h-4 w-4 text-green-600" />
        <span>{{ isRevista ? 'Pedir da Revista no WhatsApp' : 'Pedir pelo WhatsApp' }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft, ShoppingBag, MessageCircle } from 'lucide-vue-next';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { formatImageUrl } from '@/lib/utils';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const isLoaded = ref(false);

const product = computed(() => {
  const id = String(route.params.id);
  return productStore.getProductById(id);
});

const isRevista = computed(() => !!product.value?.name.toLowerCase().includes('revista'));

const whatsappUrl = computed(() => {
  if (!product.value) return '#';
  if (isRevista.value || product.value.price === 0) {
    const msg = encodeURIComponent(
      `Olá Loja da Preta! Gostaria de consultar ou fazer um pedido através da ${product.value.name}.`
    );
    return `https://wa.me/5555999911746?text=${msg}`;
  }
  const priceFormatted = product.value.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const msg = encodeURIComponent(
    `Olá Loja da Preta! Tenho interesse no produto: ${product.value.name} (R$ ${priceFormatted}).`
  );
  return `https://wa.me/5555999911746?text=${msg}`;
});

function handleAddToCart() {
  if (product.value) {
    cartStore.addItem(product.value);
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Product Found -->
    <div v-if="product">
      <router-link
        to="/catalog"
        class="inline-flex items-center text-sm text-primary font-semibold hover:underline mb-8 gap-2"
      >
        <ArrowLeft class="h-4 w-4" /> Voltar para o catálogo
      </router-link>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        <!-- Image Box -->
        <div class="relative aspect-square rounded-3xl overflow-hidden bg-secondary/10 border border-primary/10 group shadow-sm">
          <img
            :src="formatImageUrl(product.image)"
            :alt="product.name"
            @load="isLoaded = true"
            class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            :class="isLoaded ? 'opacity-100' : 'opacity-0'"
          />
          <div
            v-if="!isLoaded"
            class="absolute inset-0 flex items-center justify-center animate-pulse bg-secondary/20"
          >
            <span class="text-muted-foreground text-sm">Carregando imagem...</span>
          </div>
        </div>

        <!-- Info Column -->
        <div class="flex flex-col">
          <span
            class="w-fit mb-4 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
          >
            {{ product.category }}
          </span>

          <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            {{ product.name }}
          </h1>

          <div class="mb-6">
            <p v-if="product.price > 0" class="text-3xl font-bold text-primary">
              R$ {{ product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </p>
            <div v-else class="inline-flex flex-col">
              <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">Disponível Sob Encomenda</span>
              <span class="text-2xl sm:text-3xl font-black text-rose-600">Catálogo Virtual Completo</span>
            </div>
          </div>

          <div class="prose prose-pink mb-8">
            <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {{ product.fullDescription }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              type="button"
              @click="handleAddToCart"
              class="flex-1 h-14 bg-primary text-white hover:bg-primary/90 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag class="h-5 w-5" /> {{ isRevista ? 'Encomendar no Carrinho' : 'Adicionar ao Carrinho' }}
            </button>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 h-14 border border-primary/20 text-primary hover:bg-primary/5 text-lg font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle class="h-5 w-5" /> {{ isRevista ? 'Pedir Revista no WhatsApp' : 'Contato WhatsApp' }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="container mx-auto px-4 py-24 text-center">
      <h2 class="text-3xl font-bold text-primary mb-4">Produto não encontrado</h2>
      <p class="text-muted-foreground mb-8">O item que você está procurando não existe ou foi removido.</p>
      <router-link
        to="/catalog"
        class="inline-flex px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
      >
        Voltar para o catálogo
      </router-link>
    </div>
  </div>
</template>

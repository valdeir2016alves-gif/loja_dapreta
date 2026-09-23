<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft, ShoppingBag, MessageCircle, BookOpen, ExternalLink, Download } from 'lucide-vue-next';
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

          <!-- Ações especiais quando for Revista / Catálogo Virtual -->
          <div v-if="product.catalogUrl" class="mb-8 p-5 bg-rose-50/70 border-2 border-rose-200/80 rounded-3xl space-y-3 shadow-xs">
            <div class="flex items-center gap-2 text-rose-700 font-extrabold text-sm uppercase tracking-wider">
              <BookOpen class="h-5 w-5" />
              <span>Folheto Virtual Completo</span>
            </div>
            <p class="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              Abra a revista online para ver todas as fotos, lançamentos e preços de campanha:
            </p>
            <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                :href="product.catalogUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 h-12 px-4 bg-[#ff2469] hover:bg-[#e01a59] text-white font-bold text-sm sm:text-base rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <BookOpen class="h-4 w-4" />
                <span>Folhear Revista Online</span>
                <ExternalLink class="h-4 w-4 opacity-75" />
              </a>
              <a
                v-if="product.pdfUrl"
                :href="product.pdfUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="h-12 px-4 border-2 border-[#ff2469]/30 bg-white hover:bg-rose-50 text-[#ff2469] font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-colors"
                title="Baixar em PDF"
              >
                <Download class="h-4 w-4" />
                <span>Baixar PDF</span>
              </a>
            </div>
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

      <!-- Leitor de Revista Integrado -->
      <div v-if="product.catalogUrl" class="mt-12 pt-10 border-t border-primary/10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 class="text-2xl sm:text-3xl font-black text-primary flex items-center gap-2">
              <BookOpen class="h-7 w-7 text-[#ff2469]" />
              <span>Leitor da Revista Nesta Página</span>
            </h2>
            <p class="text-sm text-gray-600 font-medium mt-1">
              Você pode folhear todas as páginas aqui embaixo ou abrir em tela cheia:
            </p>
          </div>
          <div class="flex gap-2">
            <a
              :href="product.catalogUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#ff2469] text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-[#e01a59] transition-all"
            >
              <ExternalLink class="h-4 w-4" />
              <span>Abrir em Tela Cheia</span>
            </a>
          </div>
        </div>

        <div class="relative w-full aspect-[4/5] sm:aspect-[16/10] max-h-[800px] rounded-3xl overflow-hidden border-2 border-primary/15 shadow-md bg-white">
          <iframe
            :src="product.catalogUrl"
            class="w-full h-full border-0"
            title="Catálogo Virtual Avon"
            loading="lazy"
            allow="fullscreen"
          ></iframe>
        </div>

        <!-- Orientações para Pedir -->
        <div class="mt-6 p-6 rounded-2xl bg-secondary/30 border border-primary/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="space-y-1 text-center md:text-left">
            <h4 class="font-extrabold text-base text-gray-900">Gostou de algum produto da revista?</h4>
            <p class="text-sm text-gray-600">Anote os códigos ou produtos que você escolheu e nos envie pelo WhatsApp para encomendarmos para você!</p>
          </div>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full md:w-auto px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 whitespace-nowrap"
          >
            <MessageCircle class="h-5 w-5" />
            <span>Enviar Pedido pelo WhatsApp</span>
          </a>
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

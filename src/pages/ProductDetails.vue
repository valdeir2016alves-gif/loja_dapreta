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
        class="inline-flex items-center text-sm sm:text-base text-primary font-bold hover:underline mb-6 gap-2 py-2 px-3.5 rounded-xl bg-secondary/40 border border-primary/10 w-fit active:scale-95 transition-all"
      >
        <ArrowLeft class="h-5 w-5" /> Voltar para o catálogo
      </router-link>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
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
            <span class="text-muted-foreground text-sm font-semibold">Carregando imagem...</span>
          </div>
        </div>

        <!-- Info Column -->
        <div class="flex flex-col">
          <span
            class="w-fit mb-3 px-3.5 py-1.5 rounded-xl bg-primary/10 text-primary text-xs sm:text-sm font-extrabold uppercase tracking-wider"
          >
            {{ product.category }}
          </span>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-3 leading-tight">
            {{ product.name }}
          </h1>

          <div class="mb-5">
            <p v-if="product.price > 0" class="text-3xl sm:text-4xl font-black text-primary">
              R$ {{ product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </p>
            <div v-else class="inline-flex flex-col">
              <span class="text-xs font-black text-muted-foreground uppercase tracking-wider">Disponível Sob Encomenda</span>
              <span class="text-2xl sm:text-3xl font-black text-rose-600">Catálogo Virtual Completo</span>
            </div>
          </div>

          <div class="prose prose-pink mb-6">
            <p class="text-gray-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
              {{ product.fullDescription }}
            </p>
          </div>

          <!-- Ações especiais quando for Revista / Catálogo Virtual -->
          <div v-if="product.catalogUrl" class="mb-8 p-5 sm:p-6 bg-gradient-to-b from-rose-50 to-rose-100/50 border-2 border-rose-300 rounded-3xl space-y-3.5 shadow-sm">
            <div class="flex items-center gap-2 text-rose-800 font-black text-base sm:text-lg uppercase tracking-wide">
              <BookOpen class="h-6 w-6 text-[#ff2469]" />
              <span>Folheie a Revista Oficial</span>
            </div>
            <p class="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
              Toque no botão abaixo para abrir a revista inteira no celular e dar zoom com os dedos:
            </p>
            <div class="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                :href="product.catalogUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 h-14 sm:h-15 px-5 bg-[#ff2469] hover:bg-[#e01a59] active:scale-[0.98] text-white font-black text-base sm:text-lg rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-all"
              >
                <BookOpen class="h-5 w-5 flex-shrink-0" />
                <span>Abrir Revista em Tela Cheia</span>
                <ExternalLink class="h-5 w-5 flex-shrink-0 opacity-80" />
              </a>
              <a
                v-if="product.pdfUrl"
                :href="product.pdfUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="h-13 sm:h-15 px-5 border-2 border-[#ff2469]/30 bg-white hover:bg-rose-50 active:scale-[0.98] text-[#ff2469] font-extrabold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 transition-all"
                title="Baixar em PDF"
              >
                <Download class="h-5 w-5 flex-shrink-0" />
                <span>Baixar em PDF</span>
              </a>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3.5 mb-8">
            <button
              type="button"
              @click="handleAddToCart"
              class="flex-1 h-14 sm:h-15 bg-primary text-white hover:bg-primary/90 text-base sm:text-lg font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-transform active:scale-[0.98]"
            >
              <ShoppingBag class="h-6 w-6" /> {{ isRevista ? 'Encomendar no Carrinho' : 'Adicionar ao Carrinho' }}
            </button>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 h-14 sm:h-15 bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg font-extrabold rounded-2xl flex items-center justify-center gap-2.5 shadow-md transition-transform active:scale-[0.98]"
            >
              <MessageCircle class="h-6 w-6" /> {{ isRevista ? 'Pedir Revista no WhatsApp' : 'Chamar no WhatsApp' }}
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

        <!-- Orientações para Pedir (Claro e Direto para Idosos) -->
        <div class="mt-6 p-6 sm:p-7 rounded-3xl bg-secondary/40 border-2 border-primary/15 flex flex-col md:flex-row items-center justify-between gap-5">
          <div class="space-y-1.5 text-center md:text-left">
            <h4 class="font-black text-lg sm:text-xl text-gray-950">Gostou de algum produto da revista?</h4>
            <p class="text-sm sm:text-base text-gray-700 font-medium">Anote os códigos ou tire um print da página e envie direto pelo WhatsApp para a Preta!</p>
          </div>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full md:w-auto h-14 sm:h-15 px-8 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-extrabold text-base sm:text-lg rounded-2xl flex items-center justify-center gap-3 shadow-md transition-all whitespace-nowrap"
          >
            <MessageCircle class="h-6 w-6" />
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

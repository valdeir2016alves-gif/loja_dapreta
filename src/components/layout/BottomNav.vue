<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Home, ShoppingBag, MessageCircle, ShoppingCart, Info } from 'lucide-vue-next';
import { useCartStore } from '@/store/useCartStore';

const route = useRoute();
const cartStore = useCartStore();

const cartCount = computed(() => cartStore.totalItems);

const whatsappUrl =
  'https://api.whatsapp.com/send/?phone=5555999911746&text=Ol%C3%A1%21+Vim+pelo+site+da+Loja+da+Preta+e+gostaria+de+fazer+um+pedido.&type=phone_number&app_absent=0';

function handleOpenCart() {
  cartStore.openCart();
}
</script>

<template>
  <!-- Barra de Navegação Fixa Inferior no Celular -->
  <nav
    class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-primary/10 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 py-2"
  >
    <div class="flex items-center justify-around max-w-md mx-auto">
      <!-- Início -->
      <router-link
        to="/"
        class="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors"
        :class="route.path === '/' ? 'text-primary font-bold' : 'text-gray-500 font-medium'"
      >
        <Home class="h-6 w-6" />
        <span class="text-xs mt-1">Início</span>
      </router-link>

      <!-- Catálogo / Produtos -->
      <router-link
        to="/catalog"
        class="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors"
        :class="route.path === '/catalog' ? 'text-primary font-bold' : 'text-gray-500 font-medium'"
      >
        <ShoppingBag class="h-6 w-6" />
        <span class="text-xs mt-1">Produtos</span>
      </router-link>

      <!-- WhatsApp Destaque Central -->
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center justify-center -mt-5"
        title="Falar no WhatsApp"
      >
        <div
          class="h-14 w-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center hover:bg-green-700 active:scale-95 transition-all border-4 border-white"
        >
          <MessageCircle class="h-7 w-7" />
        </div>
        <span class="text-[11px] font-bold text-green-700 mt-0.5">WhatsApp</span>
      </a>

      <!-- Sobre a Loja -->
      <router-link
        to="/about"
        class="flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors"
        :class="route.path === '/about' ? 'text-primary font-bold' : 'text-gray-500 font-medium'"
      >
        <Info class="h-6 w-6" />
        <span class="text-xs mt-1">Sobre</span>
      </router-link>

      <!-- Carrinho -->
      <button
        type="button"
        @click="handleOpenCart"
        class="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl text-gray-500 font-medium transition-colors hover:text-primary"
      >
        <ShoppingCart class="h-6 w-6" />
        <span class="text-xs mt-1">Carrinho</span>
        <span
          v-if="cartCount > 0"
          class="absolute top-0 right-2 bg-red-500 text-white text-[11px] font-extrabold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
        >
          {{ cartCount }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ShoppingBag, Search, Menu, X, User, MessageCircle } from 'lucide-vue-next';
import { useCartStore } from '@/store/useCartStore';

const isMenuOpen = ref(false);
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const cartCount = computed(() => cartStore.totalItems);

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Catálogo de Produtos', path: '/catalog' },
  { name: 'Sobre a Loja', path: '/#about' },
];

const logoUrl = import.meta.env.BASE_URL + 'logo.jpg';
const whatsappUrl =
  'https://api.whatsapp.com/send/?phone=5555999911746&text=Ol%C3%A1%21+Vim+pelo+site+da+Loja+da+Preta.&type=phone_number&app_absent=0';

function handleOpenCart() {
  cartStore.openCart();
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full shadow-sm bg-white">
    <!-- Barra Superior de Contato / Informação -->
    <div class="bg-[#243b4f] text-white py-1.5 px-4 text-xs sm:text-sm text-center font-medium flex items-center justify-center gap-2">
      <span>🚚 Entregas em São Gabriel e Região</span>
      <span class="opacity-60 hidden sm:inline">•</span>
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="hidden sm:inline-flex items-center gap-1 hover:underline text-green-300 font-semibold"
      >
        <MessageCircle class="h-3.5 w-3.5" /> WhatsApp: (55) 99991-1746
      </a>
    </div>

    <!-- Navegação Principal -->
    <nav class="border-b border-primary/10 bg-white/95 backdrop-blur-md">
      <div class="container mx-auto px-4 h-18 py-2 flex items-center justify-between gap-2">
        <!-- Logo e Nome -->
        <router-link to="/" class="flex items-center gap-3 py-1">
          <img
            :src="logoUrl"
            alt="Foto da Preta - Loja da Preta"
            class="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-primary/20 flex-shrink-0"
          />
          <div class="flex flex-col">
            <span class="text-xl sm:text-2xl font-black text-primary leading-tight tracking-tight">
              Loja da Preta
            </span>
            <span class="text-[11px] sm:text-xs text-muted-foreground font-semibold">
              Cosméticos & Utilidades
            </span>
          </div>
        </router-link>

        <!-- Links Desktop -->
        <div class="hidden md:flex items-center gap-8">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-base font-semibold transition-colors hover:text-primary"
            :class="route.path === link.path ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-gray-600'"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- Botões de Ação -->
        <div class="flex items-center gap-2">
          <!-- Botão WhatsApp no topo (em destaque no celular) -->
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
            title="Abrir WhatsApp"
          >
            <MessageCircle class="h-4 w-4" />
            <span class="hidden xs:inline">WhatsApp</span>
          </a>

          <!-- Carrinho -->
          <button
            type="button"
            @click="handleOpenCart"
            class="relative inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
            title="Abrir carrinho"
          >
            <ShoppingBag class="h-5 w-5" />
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-extrabold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
            >
              {{ cartCount }}
            </span>
          </button>

          <!-- Menu Mobile Toggle -->
          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl hover:bg-secondary/40 text-gray-700 transition-colors"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Menu"
          >
            <X v-if="isMenuOpen" class="h-6 w-6" />
            <Menu v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Menu Dropdown Mobile -->
      <div
        v-if="isMenuOpen"
        class="md:hidden border-t border-primary/10 bg-white p-5 flex flex-col gap-3 animate-in slide-in-from-top duration-300 shadow-lg"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="text-lg font-bold py-3 px-3 rounded-xl border border-primary/10 text-primary hover:bg-primary/5 transition-colors"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </router-link>

        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-2 text-base shadow-sm"
        >
          <MessageCircle class="h-5 w-5" /> Conversar no WhatsApp
        </a>

        <router-link
          to="/admin"
          class="text-sm font-semibold text-center text-muted-foreground py-2 hover:text-primary transition-colors"
          @click="isMenuOpen = false"
        >
          Acesso Administrativo (Gerenciar Loja)
        </router-link>
      </div>
    </nav>
  </header>
</template>

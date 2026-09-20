<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-vue-next';
import { useCartStore } from '@/store/useCartStore';

const isMenuOpen = ref(false);
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const cartCount = computed(() => cartStore.totalItems);

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Catálogo', path: '/catalog' },
  { name: 'Sobre', path: '/#about' },
];

const logoUrl = import.meta.env.BASE_URL + 'logo.jpg';

function handleOpenCart() {
  cartStore.openCart();
}
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-xl font-bold text-primary flex items-center gap-3">
        <img
          :src="logoUrl"
          alt="Loja da Preta"
          class="w-10 h-10 rounded-full object-cover shadow-sm"
        />
        <span class="hidden sm:inline">Loja da Preta</span>
      </router-link>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-8">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="text-sm font-medium transition-colors hover:text-primary"
          :class="route.path === link.path ? 'text-primary font-semibold' : 'text-muted-foreground'"
        >
          {{ link.name }}
        </router-link>
      </div>

      <!-- Icons -->
      <div class="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          class="hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-secondary/40 text-muted-foreground transition-colors"
          title="Buscar"
          @click="router.push('/catalog')"
        >
          <Search class="h-5 w-5" />
        </button>

        <router-link
          to="/admin"
          class="inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-secondary/40 text-muted-foreground transition-colors"
          title="Painel Administrativo"
        >
          <User class="h-5 w-5" />
        </router-link>

        <button
          type="button"
          @click="handleOpenCart"
          class="relative inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
          title="Carrinho"
        >
          <ShoppingBag class="h-5 w-5" />
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-primary"
          >
            {{ cartCount }}
          </span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-secondary/40 text-muted-foreground"
          @click="isMenuOpen = !isMenuOpen"
        >
          <X v-if="isMenuOpen" class="h-6 w-6" />
          <Menu v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden border-t bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300"
    >
      <router-link
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="text-lg font-medium py-2 border-b last:border-0"
        @click="isMenuOpen = false"
      >
        {{ link.name }}
      </router-link>
      <button
        type="button"
        @click="isMenuOpen = false; handleOpenCart()"
        class="w-full py-3 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2"
      >
        <ShoppingBag class="h-5 w-5" /> Ver Carrinho ({{ cartCount }})
      </button>
    </div>
  </nav>
</template>
